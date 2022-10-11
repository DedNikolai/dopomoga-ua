package dopomogaua.controller;

import dopomogaua.dto.request.MessageRequest;
import dopomogaua.dto.response.MessageResponse;
import dopomogaua.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<MessageResponse> createCategory(@RequestBody MessageRequest request) {
        MessageResponse response = messageService.createMessage(request);
        return ResponseEntity.ok(response);
    }
}
