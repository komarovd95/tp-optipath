package ssau.ru.cars;

import ssau.ru.DomainObject;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity
@Table(name = "FUEL_TYPES")
public class FuelType extends DomainObject<Long> {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "fuel_type", unique = true, nullable = false, length = 10)
    @NotNull @Size(min = 1, max = 10)
    private String fuelTypeName;

    @Column(name = "cost", nullable = false)
    @NotNull @Min(0)
    private Double cost;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.REMOVE)
    private Collection<Car> cars;

    public FuelType() {}

    public FuelType(String fuelType, Double cost) {
        this.fuelTypeName = fuelType;
        this.cost = cost;
    }

    @Override
    public Long getId() {
        return id;
    }

    public String getFuelTypeName() {
        return fuelTypeName;
    }

    public void setFuelTypeName(String fuelTypeName) {
        this.fuelTypeName = fuelTypeName;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Collection<Car> getCars() {
        return cars;
    }

    public void setCars(Collection<Car> cars) {
        this.cars = cars;
    }
}
