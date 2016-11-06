package ssau.ru.cars;

import ssau.ru.DomainObject;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity
@Table(name = "CAR_BRANDS")
public class CarBrand extends DomainObject<Long> {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "car_brand_name", unique = true, nullable = false, length = 50)
    @NotNull @Size(min = 1, max = 50) @Pattern(regexp = "^[\\p{L}\\d\\s]+$")
    private String brandName;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.REMOVE)
    private Collection<Car> cars;

    public CarBrand() {
    }

    public CarBrand(String brandName) {
        this.brandName = brandName;
    }

    @Override
    public Long getId() {
        return id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Collection<Car> getCars() {
        return cars;
    }

    public void setCars(Collection<Car> cars) {
        this.cars = cars;
    }
}
