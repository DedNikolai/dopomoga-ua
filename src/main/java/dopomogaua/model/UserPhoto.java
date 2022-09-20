package dopomogaua.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_photo")
@Data
@NoArgsConstructor
public class UserPhoto extends DateAudit {
    @Id
    @SequenceGenerator(name = "userPhotoIdSeq", sequenceName = "user_photo_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userPhotoIdSeq")
    private Long id;

    @Column(name = "photo_name")
    private String name;

    @Column(name = "location")
    private String location;
}
