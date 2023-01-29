package dopomogaua.repository;

import dopomogaua.model.Chat;
import dopomogaua.model.Message;
import dopomogaua.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByUserAndIsReadFalse (User user);

    List<Message> findAllByChatAndIsReadFalse (Chat chat);
}
