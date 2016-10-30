package ssau.ru.cars;

import ssau.ru.DomainObject;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "FUEL_TYPES")
public class FuelType extends DomainObject<Long> {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "fuel_type", unique = true, nullable = false, length = 10)
    @NotNull @Size(min = 1, max = 10)
    private String fuelType;

    @Column(name = "cost", nullable = false)
    @NotNull @Min(0)
    private Double cost;

    public FuelType() {}

    public FuelType(String fuelType, Double cost) {
        this.fuelType = fuelType;
        this.cost = cost;
    }

    @Override
    public Long getId() {
        return id;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}
