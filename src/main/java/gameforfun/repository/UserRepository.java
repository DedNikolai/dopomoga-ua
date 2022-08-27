package gameforfun.repository;

import gameforfun.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  Boolean existsByEmail(String email);

  @Query("select u from User u where "
          + "(:param is null or lower(u.firstName) like lower(CONCAT('%', :param, '%'))) or "
          + "(:param is null or lower(u.lastName) like lower(CONCAT('%', :param, '%')))")
  Page<User> findAllByParams(@Param("param") String param, Pageable pageable);
}
