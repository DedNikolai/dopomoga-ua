package gameforfun.dto.request;

import gameforfun.model.Region;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class ProposalRequest {
    private Long id;
    private Date createdDate;
    private String title;
    private String description;
    private UserRequest user;
    private Set<CategoryRequest> categories;
    private Boolean isActive;
    private Region region;
}
