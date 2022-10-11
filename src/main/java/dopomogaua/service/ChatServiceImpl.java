package dopomogaua.service;

import dopomogaua.dto.request.UserRequest;
import dopomogaua.dto.response.ChatResponse;
import dopomogaua.exeption.ResourceNotFoundException;
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
    public ChatResponse getChatByUser(Long userId) {
        User user = userRepository.findById(userId).
                orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
        Set<User> users = new HashSet<>();
        users.add(user);
        users.add(currentUser);

        List<Chat> presentChats = chatRepository.findDistinctByUsersIn(users);
        if (presentChats.size() > 0) {
            return modelMapper.map(presentChats.get(0), ChatResponse.class);
        }

        Chat newChat = new Chat();
        newChat.setUsers(users);
        Chat createdChat = chatRepository.save(newChat);

        return modelMapper.map(createdChat, ChatResponse.class);
    }
}
