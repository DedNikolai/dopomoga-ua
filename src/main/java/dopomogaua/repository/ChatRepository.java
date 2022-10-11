package dopomogaua.repository;

import dopomogaua.model.Chat;
import dopomogaua.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
  List<Chat> findDistinctByUsersIn (Set<User> userSet);
}
