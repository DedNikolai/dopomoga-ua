package gameforfun.dto.response;

import gameforfun.model.Region;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class NeedResponse {
  private Long id;
  private Date createdDate;
  private String title;
  private String description;
  private UserResponse user;
  private Set<NeedCategoryResponse> categories;
  private RegionResponse region;
}
