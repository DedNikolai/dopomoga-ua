package dopomogaua.dto.response;

import lombok.Data;

import java.util.Date;

@Data
public class MessageResponse {
    private Long id;
    private Date createdDate;
    private String text;
    private UserResponse user;
}
