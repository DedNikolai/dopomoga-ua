package dopomogaua.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chats")
@NoArgsConstructor
@Data
public class Chat extends DateAudit {
  @Id
  @SequenceGenerator(name = "chatIdSeq", sequenceName = "chat_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chatIdSeq")
  private Long id;

  @OneToMany(mappedBy = "chat", fetch = FetchType.EAGER)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private List<Message> messages = new ArrayList<>();

  @ManyToMany(fetch = FetchType.EAGER)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinTable(name = "chats_users",
      joinColumns = {@JoinColumn(name = "chat_id")},
      inverseJoinColumns = {@JoinColumn(name = "user_id")})
  private Set<User> users;
}
