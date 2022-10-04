package dopomogaua.service;

import dopomogaua.dto.request.UserRequest;
import dopomogaua.dto.response.ChatResponse;

public interface ChatService {
    ChatResponse createChat(UserRequest user);
}
