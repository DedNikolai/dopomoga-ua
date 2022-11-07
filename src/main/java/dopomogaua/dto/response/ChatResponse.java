package dopomogaua.dto.response;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ChatResponse {
    private Long id;
    private List<MessageResponse> messages;
    private Set<UserResponse> users;
}
