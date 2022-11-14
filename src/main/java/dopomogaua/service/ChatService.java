package dopomogaua.service;

import dopomogaua.dto.response.ChatResponse;

import java.util.List;

public interface ChatService {
    ChatResponse getChatByUser(Long userId);

    List<ChatResponse> getCurrentUserChats(String param);
}
