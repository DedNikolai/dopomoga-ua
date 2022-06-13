package gameforfun.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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

  @ManyToMany(mappedBy = "needs")
  private Set<NeedCategory> categories;

  @Column(name = "is_active")
  private Boolean isActive;

  @Enumerated(EnumType.STRING)
  @Column(name = "region")
  private Region region;
}
