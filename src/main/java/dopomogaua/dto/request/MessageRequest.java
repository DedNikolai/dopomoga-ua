package dopomogaua.dto.request;

import dopomogaua.dto.response.UserResponse;
import lombok.Data;

import java.util.Date;

@Data
public class MessageRequest {
    private Long id;
    private Date createdDate;
    private String text;
    private UserResponse user;
    private ChatRequest chat;
}
