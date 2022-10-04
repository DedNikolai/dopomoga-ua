package dopomogaua.service;

import dopomogaua.dto.request.MessageRequest;
import dopomogaua.dto.response.MessageResponse;
import dopomogaua.model.Message;
import dopomogaua.repository.MessageRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{
    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;

    @Override
    public MessageResponse createMessage(MessageRequest messageRequest) {
        Message message = modelMapper.map(messageRequest, Message.class);
        Message savedMessage = messageRepository.save(message);
        return modelMapper.map(savedMessage, MessageResponse.class);
    }
}
