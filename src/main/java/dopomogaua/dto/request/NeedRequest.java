package dopomogaua.dto.request;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class NeedRequest {
  private Long id;
  private Date createdDate;
  private String title;
  private String description;
  private UserRequest user;
  private Set<CategoryRequest> categories;
  private RegionRequest region;
  private Boolean isActive;
}
