package gameforfun.dto.request;

import gameforfun.model.Role;
import gameforfun.model.UserPhoto;
import lombok.Data;

import java.util.Set;

@Data
public class UserRequest {
  private Long id;
  private String email;
  private Set<Role> roles;
  private String firstName;
  private String lastName;
  private String phone;
  private UserPhoto photo;
}
