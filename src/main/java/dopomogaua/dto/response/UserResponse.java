package dopomogaua.dto.response;

import dopomogaua.model.Role;
import dopomogaua.model.UserPhoto;
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
  private Integer messageNotes;
}
