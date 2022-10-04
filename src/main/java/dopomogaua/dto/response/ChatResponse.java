package dopomogaua.dto.response;

import lombok.Data;

import java.util.Set;

@Data
public class ChatResponse {
    private Long id;
    private Set<MessageResponse> messages;
    private Set<UserResponse> users;
}
