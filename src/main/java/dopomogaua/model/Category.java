package dopomogaua.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
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
  @SequenceGenerator(name = "categoryIdSeq", sequenceName = "category_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categoryIdSeq")
  private Long id;

  @Column(name = "category_name")
  private String categoryName;

  @ManyToMany(mappedBy = "categories", cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Need> needs;

  @ManyToMany(mappedBy = "categories", cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Proposal> proposals;
}
