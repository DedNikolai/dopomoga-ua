package dopomogaua.controller;

import dopomogaua.dto.response.ChatResponse;
import dopomogaua.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("user/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<ChatResponse> createCategory(@PathVariable Long id) {
        ChatResponse response = chatService.getChatByUser(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("user/current")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<ChatResponse>> getUserChats() {
        List<ChatResponse> response = chatService.getCurrentUserChats();
        return ResponseEntity.ok(response);
    }
}
