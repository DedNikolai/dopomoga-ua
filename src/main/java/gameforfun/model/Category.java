package gameforfun.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "category")
@NoArgsConstructor
@Data
public class Category extends DateAudit{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "category_name")
  private String categoryName;

  @ManyToMany(mappedBy = "categories", cascade = CascadeType.ALL)
  @ToString.Exclude
  private Set<Need> needs;

  @ManyToMany
  @JoinTable(name = "categories_propositions",
          joinColumns = {@JoinColumn(name = "category_id")},
          inverseJoinColumns = {@JoinColumn(name = "proposal_id")})
  @ToString.Exclude
  private Set<Proposal> proposals;
}
