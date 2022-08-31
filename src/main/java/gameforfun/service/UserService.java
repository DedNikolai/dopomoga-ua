package gameforfun.service;

import gameforfun.dto.request.LoginRequest;
import gameforfun.dto.request.PasswordRequest;
import gameforfun.dto.request.SignUpRequest;
import gameforfun.dto.request.UserRequest;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.JwtAuthenticationResponse;
import gameforfun.dto.response.UserResponse;
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
