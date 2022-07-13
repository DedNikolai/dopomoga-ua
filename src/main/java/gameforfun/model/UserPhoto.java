package gameforfun.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_photo")
@Data
@NoArgsConstructor
public class UserPhoto extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "photo_name")
    private String name;

    @Column(name = "location")
    private String location;
}
