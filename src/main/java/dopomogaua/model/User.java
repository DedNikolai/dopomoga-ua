package dopomogaua.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User extends DateAudit {
  @Id
  @SequenceGenerator(name = "userIdSeq", sequenceName = "user_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userIdSeq")
  private Long id;

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "phone")
  private String phone;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "role")
  @Enumerated(EnumType.STRING)
  private Set<Role> roles = new HashSet<>();

  @Column(columnDefinition = "boolean default false")
  private Boolean confirmed = false;

  @OneToMany(mappedBy = "user")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Need> needs;

  @OneToMany(mappedBy = "user")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Message> messages;

  @OneToMany(mappedBy = "recipient")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Message> receivedmessages;

  @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Chat> chats;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "photo_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private UserPhoto photo;
}
