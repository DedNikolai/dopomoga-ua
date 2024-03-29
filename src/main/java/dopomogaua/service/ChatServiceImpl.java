package dopomogaua.service;

import dopomogaua.dto.response.ChatResponse;
import dopomogaua.exeption.AppException;
import dopomogaua.exeption.ResourceNotFoundException;
import dopomogaua.model.Chat;
import dopomogaua.model.Message;
import dopomogaua.model.User;
import dopomogaua.repository.ChatRepository;
import dopomogaua.repository.MessageRepository;
import dopomogaua.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final ModelMapper modelMapper;
    private final MessageRepository messageRepository;

    @Override
    public ChatResponse getChatByUser(Long userId) {
        User user = userRepository.findById(userId).
                orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);

        if (currentUser.getId() == user.getId()) {
            throw new AppException("Can create this chat");
        }

        List<Chat> currentUserChats = chatRepository.findAllByUsers(currentUser);
        List<Chat> presentChats = currentUserChats.stream().filter(chat -> {
           List<User> presentUserList = chat.getUsers().stream().filter(item -> item.getId() == user.getId()).collect(Collectors.toList());
           if (presentUserList.size() > 0) {
               return  true;
           }

           return false;
        }).collect(Collectors.toList());

        if (presentChats.size() > 0) {
            Chat currentChat = presentChats.get(0);
            currentChat.getMessages().sort(Comparator.comparing(Message :: getCreatedDate));
            List<Message> messages = messageRepository.findAllByChatAndRecipientAndIsReadFalse(currentChat, currentUser);
            messages.forEach(message -> message.setIsRead(true));
            messageRepository.saveAll(messages);
            return modelMapper.map(currentChat, ChatResponse.class);
        }


        Set<User> users = new HashSet<>();
        users.add(currentUser);
        users.add(user);
        Chat newChat = new Chat();
        newChat.setUsers(users);
        Chat createdChat = chatRepository.save(newChat);

        return modelMapper.map(createdChat, ChatResponse.class);
    }

    @Override
    public List<ChatResponse> getCurrentUserChats(String param) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
        Set<User> users = new HashSet<>();
        users.add(currentUser);
        List<Chat> userChats = chatRepository.findDistinctByUsersIn(users).stream().
                filter(chat -> {
                    if (param == null || param == "") {
                        return true;
                    }
                    User opositeUser = chat.getUsers().stream()
                            .filter(user -> user.getId() != currentUser.getId()).collect(Collectors.toList()).get(0);
                    String firstName = opositeUser.getFirstName().toLowerCase();
                    String secondName = opositeUser.getLastName().toLowerCase();
                    String substr = param.toLowerCase();
                    return firstName.contains(substr) || secondName.contains(substr);
                }).collect(Collectors.toList());
        userChats.sort(Comparator.comparing(Chat :: getCreatedDate));
        userChats.stream().forEach(chat -> {
            List<Message> messages = chat.getMessages().stream().filter(message -> {
                return !message.getIsRead() && message.getUser().getId() != currentUser.getId();
            }).collect(Collectors.toList());
            chat.setMessages(messages);
        });

        List<ChatResponse> response = userChats.stream()
                .map(chat -> modelMapper.map(chat, ChatResponse.class))
                .collect(Collectors.toList());
        return response;
    }
}
