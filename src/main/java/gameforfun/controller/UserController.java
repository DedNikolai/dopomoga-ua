package gameforfun.controller;


import gameforfun.dto.request.*;
import gameforfun.dto.response.ApiResponse;
import gameforfun.dto.response.UserResponse;
import gameforfun.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @PostMapping("auth/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return ResponseEntity.ok(userService.authenticateUser(loginRequest));
  }

  @PostMapping("auth/signup")
  public ResponseEntity<ApiResponse> registerUser(HttpServletRequest request, @Valid @RequestBody SignUpRequest signUpRequest) {
    return ResponseEntity.ok(userService.registerUser(request, signUpRequest));
  }

  @GetMapping("users/current")
  public ResponseEntity<UserResponse> getCurrentUser() {
    return ResponseEntity.ok(userService.getCurrentUser());
  }

  @GetMapping("user/confirm-registration")
  public ResponseEntity<ApiResponse> getCurrentUser(@RequestParam String token) {
    return ResponseEntity.ok(userService.confirmRegistration(token));
  }


  @PostMapping("/user/resetPassword")
  public ResponseEntity<ApiResponse> resetPassword(HttpServletRequest request,
                                                   @RequestBody ResetPasswordRequest resetPasswordRequest) {
    ApiResponse response = userService.resetPassword(request, resetPasswordRequest.getEmail());
    return ResponseEntity.ok(response);
  }

//
//  @GetMapping("/user/changePassword")
//  public String showChangePasswordPage(@RequestParam("token") String token) {
//
//  }

  @PostMapping("/user/savePassword")
  public ResponseEntity<ApiResponse> savePassword(@RequestBody PasswordRequest passwordRequest) {
    ApiResponse response = userService.changePassword(passwordRequest);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/user/update")
  public ResponseEntity<ApiResponse> updateUser(@RequestBody UserRequest request) {
    ApiResponse response = userService.updateUser(request);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/user/image-update")
  public ResponseEntity<ApiResponse> uploadImage(@RequestParam MultipartFile image) throws Exception {
    ApiResponse response = userService.updatePhoto(image.getBytes(), image.getOriginalFilename());
    return ResponseEntity.ok(response);
  }
}
