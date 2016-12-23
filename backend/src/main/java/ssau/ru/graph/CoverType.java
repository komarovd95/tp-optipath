package ssau.ru.graph;

import ssau.ru.DomainObject;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;

@Entity
@Table(name = "COVER_TYPES")
public class CoverType extends DomainObject<Long> implements Serializable {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "cover_type_name", nullable = false, unique = true, length = 50)
    @NotNull @Size(min = 1, max = 50) @Pattern(regexp = "^[\\p{L}\\d\\s]+$")
    private String coverTypeName;

    @Column(name = "cover_type_slowdown", nullable = false)
    @NotNull @Min(0) @Max(1)
    private Double slowdown;

    @Override
    public Long getId() {
        return id;
    }

    public String getCoverTypeName() {
        return coverTypeName;
    }

    public void setCoverTypeName(String coverTypeName) {
        this.coverTypeName = coverTypeName;
    }

    public Double getSlowdown() {
        return slowdown;
    }

    public void setSlowdown(Double slowdown) {
        this.slowdown = slowdown;
    }
}
