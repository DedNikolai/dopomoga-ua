package gameforfun.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class ConfirmationToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="token_id")
  private Long tokenid;

  @Column(name="confirmation_token")
  private String confirmationToken;

  @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "user_id")
  private User user;

  @Temporal(TemporalType.TIMESTAMP)
  private Date createdDate;

  public ConfirmationToken(User user) {
    this.user = user;
    createdDate = new Date();
    confirmationToken = UUID.randomUUID().toString();
  }

}
