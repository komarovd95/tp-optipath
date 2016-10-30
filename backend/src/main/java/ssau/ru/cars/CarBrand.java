package ssau.ru.cars;

import ssau.ru.DomainObject;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "CAR_BRANDS")
public class CarBrand extends DomainObject<Long> {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "car_brand_name", unique = true, nullable = false, length = 50)
    @NotNull @Size(min = 1, max = 50) @Pattern(regexp = "^[\\p{L}\\d\\s]+$")
    private String brandName;

    @OneToMany(mappedBy = "brand")
    private Collection<Car> cars;

    public CarBrand() {
        this.cars = new ArrayList<>();
    }

    public CarBrand(String brandName) {
        this();
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
        return Collections.unmodifiableCollection(cars);
    }

    public void addCar(Car car) {
        cars.add(car);
    }

    public void removeCar(Car car) {
        cars.remove(car);
    }
}
