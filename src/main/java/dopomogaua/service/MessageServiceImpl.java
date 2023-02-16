package dopomogaua.service;

import dopomogaua.dto.request.MessageRequest;
import dopomogaua.dto.response.MessageResponse;
import dopomogaua.exeption.ResourceNotFoundException;
import dopomogaua.model.Chat;
import dopomogaua.model.Message;
import dopomogaua.model.User;
import dopomogaua.repository.ChatRepository;
import dopomogaua.repository.MessageRepository;
import dopomogaua.repository.UserPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{
    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRepository chatRepository;

    @Override
    public MessageResponse createMessage(MessageRequest messageRequest) {
        Message message = modelMapper.map(messageRequest, Message.class);
        Chat chat = chatRepository.findById(message.getChat().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", message.getChat().getId()));
        User recipient = chat.getUsers().stream()
                .filter(user -> user.getId() != message.getUser().getId()).collect(Collectors.toList()).get(0);
        message.setIsRead(false);
        message.setRecipient(recipient);
        Message savedMessage = messageRepository.save(message);
        Long id = savedMessage.getChat().getId();
        messagingTemplate.convertAndSend(String.format("/topic/chats/%s", id),
                modelMapper.map(savedMessage, MessageResponse.class));
        return modelMapper.map(savedMessage, MessageResponse.class);
    }

    @Override
    public MessageResponse changeMessage(MessageRequest messageRequest, Long id) {
        Message messageFromDb = messageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message", "id", id));
        messageFromDb.setIsRead(messageRequest.getIsRead());
        Message savedMessage = messageRepository.save(messageFromDb);
        return modelMapper.map(savedMessage, MessageResponse.class);
    }
}
