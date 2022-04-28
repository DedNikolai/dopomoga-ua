package gameforfun.repository;

import gameforfun.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
  PasswordResetToken findByToken(String token);
}