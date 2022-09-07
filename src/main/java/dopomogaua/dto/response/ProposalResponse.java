package dopomogaua.dto.response;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class ProposalResponse {
    private Long id;
    private Date createdDate;
    private String title;
    private String description;
    private UserResponse user;
    private Set<CategoryResponse> categories;
    private RegionResponse region;
    private Boolean isActive;
}
