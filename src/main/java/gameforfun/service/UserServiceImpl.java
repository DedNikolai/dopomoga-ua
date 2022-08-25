package gameforfun.service;

import gameforfun.dto.request.LoginRequest;
import gameforfun.dto.request.PasswordRequest;
import gameforfun.dto.request.SignUpRequest;
import gameforfun.dto.request.UserRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.JwtAuthenticationResponse;
import gameforfun.dto.response.UserResponse;
import gameforfun.model.ConfirmationToken;
import gameforfun.model.PasswordResetToken;
import gameforfun.model.Role;
import gameforfun.model.User;
import gameforfun.model.UserPhoto;
import gameforfun.repository.ConfirmationTokenRepository;
import gameforfun.repository.FileSystemRepository;
import gameforfun.repository.PasswordResetTokenRepository;
import gameforfun.repository.UserPhotoRepository;
import gameforfun.repository.UserRepository;
import gameforfun.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider tokenProvider;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final JavaMailSender mailSender;
  private final MessageSource messages;
  private final Environment env;
  private final ConfirmationTokenRepository confirmationTokenRepository;
  private final ModelMapper modelMapper;
  private final FileSystemRepository fileSystemRepository;
  private final UserPhotoRepository userPhotoRepository;

  @Override
  public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
        loginRequest.getEmail(),
        loginRequest.getPassword()
    );
    Authentication authentication = authenticationManager.authenticate(token);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = tokenProvider.generateToken(authentication);
    return new JwtAuthenticationResponse(jwt);
  }

  @Override
  @Transactional
  public ApiResponse registerUser(HttpServletRequest request, SignUpRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return new ApiResponse(false,"Email Address already in use!");
    }

    User user = new User();
    Set<Role> roles = new HashSet<>();
    roles.add(Role.USER);
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    user.setRoles(roles);
    user.setFirstName(signUpRequest.getFirstName());
    user.setLastName(signUpRequest.getLastName());

    // remove after adding email confirmation
    //user.setConfirmed(true);

    User savedUser = userRepository.save(user);

    ConfirmationToken confirmationToken = new ConfirmationToken(user);

    confirmationTokenRepository.save(confirmationToken);

    String url = getAppUrl(request) + "/confirm-registration?token=" + confirmationToken.getConfirmationToken() ;
    SimpleMailMessage email = new SimpleMailMessage();
    email.setSubject("Complete Registration!");
    email.setText("To confirm your account, please click here : " + " \r\n" + url);
    email.setTo(savedUser.getEmail());
    email.setFrom("nikolai.blashchuk@gmail.com");

    mailSender.send(email);

    return new ApiResponse(true,"We send the letter to your email to confirm registration");

//    if (savedUser.getId() != null) {
//      return new ApiResponse(true,"New User was created");
//    } else {
//      return new ApiResponse(false,"Error");
//    }


  }

  private String getAppUrl(HttpServletRequest request) {
    return "http://localhost:3000";
//    return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
  }

  @Override
  public UserResponse getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElse(null);
    return modelMapper.map(user, UserResponse.class);
  }

  @Override
  public ApiResponse resetPassword(HttpServletRequest request, String email) {
    User user = userRepository.findByEmail(email).orElse(null);

    if (user == null) {
      return new ApiResponse(false, "invalid email");
    }

    String token = UUID.randomUUID().toString();
    PasswordResetToken passwordResetToken = createPasswordResetTokenForUser(user, token);

    mailSender.send(constructResetTokenEmail(getAppUrl(request), passwordResetToken.getToken(), passwordResetToken.getUser()));

    return new ApiResponse(true, "На ваш email відправлено листа для зміни пароля");
  }

  public PasswordResetToken createPasswordResetTokenForUser(User user, String token) {
    PasswordResetToken myToken = new PasswordResetToken(token, user);
    return passwordResetTokenRepository.save(myToken);
  }

  private SimpleMailMessage constructResetTokenEmail(
      String contextPath, String token, User user) {
    String url = contextPath + "/reset-password?token=" + token;
//    String message = "To complete the password reset process, please click here: ";
    String message = "To complete the password reset process, copy this code: ";
    return constructEmail("Reset Password", message + " \r\n" + url, user);
  }

  private SimpleMailMessage constructEmail(String subject, String body,
                                           User user) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setSubject(subject);
    email.setText(body);
    email.setTo(user.getEmail());
    email.setFrom("nikolai.blashchuk@gmail.com");
    return email;
  }

  @Override
  public ApiResponse changePassword(PasswordRequest passwordRequest) {
    final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(passwordRequest.getToken());
    List<PasswordResetToken> tokens = passwordResetTokenRepository.findAll();
    String result = !isTokenFound(passToken) ? "invalidToken"
        : isTokenExpired(passToken) ? "expired"
        : null;

    if(result != null) {
      return new ApiResponse(false, result);
    }

    User user = passToken.getUser();
    if (user != null) {
      changeUserPassword(user, passwordRequest.getPassword());
    }
    return new ApiResponse(true, "Password was changed");
  }

  private boolean isTokenFound(PasswordResetToken passToken) {
    return passToken != null;
  }

  private boolean isTokenExpired(PasswordResetToken passToken) {
    final Calendar cal = Calendar.getInstance();
    return passToken.getExpiryDate().before(cal.getTime());
  }

  @Override
  public ApiResponse confirmRegistration(String confirmationToken) {
    ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

    if(token != null)
    {
      User user = userRepository.findByEmail(token.getUser().getEmail()).orElseThrow(() ->
          new UsernameNotFoundException("User not found with email : " + token.getUser().getEmail()));

      user.setConfirmed(true);
      userRepository.save(user);
      return new ApiResponse(true, "Account confirmed");
    }

    return new ApiResponse(false, "invalid token");
  }

  @Override
  public ApiResponse updateUser(UserRequest userRequest) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElse(null);
    User updatedUser = modelMapper.map(userRequest, User.class);
    updatedUser.setId(user.getId());
    userRepository.save(updatedUser);
    return new ApiResponse(true, "User was updated");
  }

  @Override
  public ApiResponse updatePhoto(byte[] bytes, String imageName) throws Exception {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElse(null);
    UserPhoto photo = uploadPhoto(bytes, imageName);
    user.setPhoto(photo);
    userRepository.save(user);
    return new ApiResponse(true, "Photo updated");
  }

  @Override
  public Page<UserResponse> getUsers(Pageable pageable) {
    Page<User> users = userRepository.findAll(pageable);
    return users.map(user -> modelMapper.map(user, UserResponse.class));
  }

  public UserPhoto uploadPhoto(byte[] bytes, String imageName) throws Exception {
    String location = fileSystemRepository.save(bytes, imageName);
    UserPhoto photo = new UserPhoto();
    photo.setName(imageName);
    photo.setLocation(location);

    return userPhotoRepository.save(photo);
  }

  public void changeUserPassword(User user, String password) {
    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);
  }
}
