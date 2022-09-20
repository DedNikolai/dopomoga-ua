package dopomogaua.model;

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
  @SequenceGenerator(name = "regionIdSeq", sequenceName = "region_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "regionIdSeq")
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
