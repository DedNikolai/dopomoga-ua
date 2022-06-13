package gameforfun.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "needs_category")
@NoArgsConstructor
@Data
public class NeedCategory extends DateAudit{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "category_name")
  private String categoryName;

  @ManyToMany
  @JoinTable(name = "categories_needs",
      joinColumns = {@JoinColumn(name = "category_id")},
      inverseJoinColumns = {@JoinColumn(name = "need_id")})
  @ToString.Exclude
  private Set<Need> needs;
}
