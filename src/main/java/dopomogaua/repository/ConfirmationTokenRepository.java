package dopomogaua.repository;

import dopomogaua.model.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
  ConfirmationToken findByConfirmationToken(String confirmationToken);
}
