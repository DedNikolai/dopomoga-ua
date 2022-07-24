package gameforfun.model;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "needs")
@NoArgsConstructor
@Data
public class Need extends DateAudit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinTable(name = "categories_needs",
          joinColumns = {@JoinColumn(name = "need_id")},
          inverseJoinColumns = {@JoinColumn(name = "category_id")})
  private Set<Category> categories;

  @Column(name = "is_active")
  private Boolean isActive;

  @ManyToOne
  @JoinColumn(name = "region")
  private Region region;
}
