package dopomogaua.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import java.util.Calendar;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class PasswordResetToken {

  private static final int EXPIRATION = 60 * 24;

  @Id
  @SequenceGenerator(name = "passwordResetTokenIdSeq", sequenceName = "password_reset_token_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "passwordResetTokenIdSeq")
  private Long id;

  private String token;

  @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "user_id")
  private User user;

  private Date expiryDate;

  public PasswordResetToken(final String token, final User user) {
    super();

    this.token = token;
    this.user = user;
    this.expiryDate = calculateExpiryDate(EXPIRATION);
  }

  private Date calculateExpiryDate(final int expiryTimeInMinutes) {
    final Calendar cal = Calendar.getInstance();
    cal.setTimeInMillis(new Date().getTime());
    cal.add(Calendar.MINUTE, expiryTimeInMinutes);
    return new Date(cal.getTime().getTime());
  }
}
