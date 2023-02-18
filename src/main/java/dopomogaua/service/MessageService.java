package dopomogaua.service;

import dopomogaua.dto.request.MessageRequest;
import dopomogaua.dto.response.MessageResponse;
import dopomogaua.model.Message;

public interface MessageService {
    MessageResponse createMessage(MessageRequest messageRequest);

    MessageResponse changeMessage(MessageRequest messageRequest, Long id);
}
