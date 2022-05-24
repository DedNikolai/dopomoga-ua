package gameforfun.dto.request;

import gameforfun.model.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class SignUpRequest {

  private String firstName;
  private String lastName;

  @NotBlank
  @Size(min = 4, max = 40)
  private String password;

  @NotBlank
  @Size(max = 40)
  @Email
  private String email;
  private Set<Role> roles;

}
