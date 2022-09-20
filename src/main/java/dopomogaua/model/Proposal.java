package dopomogaua.model;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "proposal")
@NoArgsConstructor
@Data
public class Proposal extends DateAudit {

  @Id
  @SequenceGenerator(name = "proposalIdSeq", sequenceName = "proposal_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proposalIdSeq")
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private User user;

  @ManyToMany(fetch = FetchType.EAGER)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinTable(name = "categories_propositions",
      joinColumns = {@JoinColumn(name = "proposal_id")},
      inverseJoinColumns = {@JoinColumn(name = "category_id")})
  private Set<Category> categories;

  @Column(name = "is_active")
  private Boolean isActive;

  @ManyToOne
  @JoinColumn(name = "region")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Region region;
}
