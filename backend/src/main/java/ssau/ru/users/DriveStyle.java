package ssau.ru.users;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import ssau.ru.DomainObject;

import javax.persistence.*;

@Entity
@Table(name = "DRIVE_STYLES")
@Cacheable
public class DriveStyle extends DomainObject<Long> {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "style_name", nullable = false, length = 20, unique = true)
    private String name;

    public DriveStyle() {}

    @JsonCreator
    public DriveStyle(@JsonProperty("name") String name) {
        this.name = name;
    }

    @Override
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
