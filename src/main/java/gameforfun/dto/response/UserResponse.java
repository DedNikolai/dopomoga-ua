package gameforfun.dto.response;

import gameforfun.model.Role;
import gameforfun.model.UserPhoto;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class UserResponse {
  private Long id;
  private String email;
  private Set<Role> roles;
  private String firstName;
  private String lastName;
  private String phone;
  private UserPhoto photo;
  private Date createdDate;
  private Date modifiedDate;
  private Boolean confirmed;
}
