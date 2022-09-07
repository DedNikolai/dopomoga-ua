package dopomogaua.dto.request;

import dopomogaua.model.Role;
import dopomogaua.model.UserPhoto;
import lombok.Data;

import java.util.Date;
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
  private Date createdDate;
  private Date modifiedDate;
  private Boolean confirmed;
}
