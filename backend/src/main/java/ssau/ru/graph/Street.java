package ssau.ru.graph;

import ssau.ru.DomainObject;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

@Entity
@Table(name = "STREETS", uniqueConstraints =
    @UniqueConstraint(columnNames = {"street_name", "street_type"}))
public class Street extends DomainObject<Long> implements Serializable {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "street_name", nullable = false)
    @NotNull @Pattern(regexp = "^[\\p{L}\\d\\s]+$")
    private String streetName;

    @Column(name = "street_type", nullable = false)
    @NotNull @Pattern(regexp = "^[\\p{L}\\d\\s]+$")
    private String streetType;

    @Override
    public Long getId() {
        return id;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getStreetType() {
        return streetType;
    }

    public void setStreetType(String streetType) {
        this.streetType = streetType;
    }
}
