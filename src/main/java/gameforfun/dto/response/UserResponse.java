package gameforfun.dto.response;

import gameforfun.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserResponse {
  private Long id;
  private String email;
  private Set<Role> roles;
  private String firstName;
  private String lastName;
}
