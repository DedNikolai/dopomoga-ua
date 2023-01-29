package dopomogaua.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "message")
@NoArgsConstructor
@Data
public class Message extends DateAudit {
  @Id
  @SequenceGenerator(name = "messageIdSeq", sequenceName = "message_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "messageIdSeq")
  private Long id;

  @Column(name = "text")
  private String text;

  @ManyToOne
  @JoinColumn(name = "chat")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Chat chat;

  @ManyToOne
  @JoinColumn(name = "owner")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private User user;

  @Column(name = "is_read", columnDefinition = "boolean default false")
  private Boolean isRead = false;

}
