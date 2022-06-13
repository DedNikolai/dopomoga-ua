package gameforfun.dto.response;

import java.util.Date;
import java.util.Set;

public class NeedResponse {
  private Long id;
  private Date createdDate;
  private String title;
  private String description;
  private UserResponse user;
  private Set<NeedCategoryResponse> categories;
}
