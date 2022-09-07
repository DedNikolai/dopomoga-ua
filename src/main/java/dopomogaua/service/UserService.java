package dopomogaua.service;

import dopomogaua.dto.request.LoginRequest;
import dopomogaua.dto.request.PasswordRequest;
import dopomogaua.dto.request.SignUpRequest;
import dopomogaua.dto.request.UserRequest;
import dopomogaua.dto.response.ApiResponse;
import dopomogaua.dto.response.JwtAuthenticationResponse;
import dopomogaua.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;

public interface UserService {

  JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest);

  ApiResponse registerUser(HttpServletRequest request, SignUpRequest signUpRequest);

  UserResponse getCurrentUser();

  ApiResponse resetPassword(HttpServletRequest request, String email);

  ApiResponse changePassword(PasswordRequest passwordRequest);

  ApiResponse confirmRegistration(String confirmationToken);

  ApiResponse updateUser(UserRequest userRequest);

  ApiResponse updatePhoto(byte[] bytes, String imageName) throws Exception;

  Page<UserResponse> getUsers(String params, Pageable pageable);

  UserResponse getUserById(Long id);
}
