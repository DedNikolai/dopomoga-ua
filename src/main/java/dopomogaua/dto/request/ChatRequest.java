package dopomogaua.dto.request;

import dopomogaua.dto.response.UserResponse;
import lombok.Data;

import java.util.Set;

@Data
public class ChatRequest {
    private Long id;
    private Set<UserResponse> users;
}
