package dopomogaua.controller;

import dopomogaua.dto.request.ChatRequest;
import dopomogaua.dto.request.UserRequest;
import dopomogaua.dto.response.ApiResponse;
import dopomogaua.dto.response.ChatResponse;
import dopomogaua.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
}
