package gameforfun.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "region")
@NoArgsConstructor
@Data
public class Region extends DateAudit {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "region_name")
  private String regionName;

  @OneToMany(mappedBy = "region")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Need> needs;

  @OneToMany(mappedBy = "region")
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private Set<Proposal> proposals;

}
