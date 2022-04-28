package gameforfun.repository;

import gameforfun.model.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
  ConfirmationToken findByConfirmationToken(String confirmationToken);
}
