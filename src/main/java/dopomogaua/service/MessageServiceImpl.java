package dopomogaua.service;

import dopomogaua.dto.request.MessageRequest;
import dopomogaua.dto.response.MessageResponse;
import dopomogaua.model.Message;
import dopomogaua.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{
    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public MessageResponse createMessage(MessageRequest messageRequest) {
        Message message = modelMapper.map(messageRequest, Message.class);
        Message savedMessage = messageRepository.save(message);
        Long id = savedMessage.getChat().getId();
        messagingTemplate.convertAndSend(String.format("/topic/chats/%s", id),
                modelMapper.map(savedMessage, MessageResponse.class));
        return modelMapper.map(savedMessage, MessageResponse.class);
    }
}
