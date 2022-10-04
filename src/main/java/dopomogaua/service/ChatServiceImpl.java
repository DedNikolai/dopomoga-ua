package dopomogaua.service;

import dopomogaua.dto.request.UserRequest;
import dopomogaua.dto.response.ChatResponse;
import dopomogaua.model.Chat;
import dopomogaua.model.User;
import dopomogaua.repository.ChatRepository;
import dopomogaua.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final ModelMapper modelMapper;

    @Override
    public ChatResponse createChat(UserRequest userRequest) {
        User user = modelMapper.map(userRequest, User.class);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
        Set<User> users = new HashSet<>();
        users.add(user);
        users.add(currentUser);
        List<Chat> presentChats = chatRepository.findAllByUsersIn(users);
        if (presentChats.size() > 0) {
            return modelMapper.map(presentChats.get(1), ChatResponse.class);
        }

        Chat newChat = new Chat();
        newChat.setUsers(users);
        Chat createdChat = chatRepository.save(newChat);

        return modelMapper.map(createdChat, ChatResponse.class);
    }
}
