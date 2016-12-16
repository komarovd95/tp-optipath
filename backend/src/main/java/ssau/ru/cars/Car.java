package ssau.ru.cars;

import ssau.ru.DomainObject;
import ssau.ru.users.PathUser;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "CARS", uniqueConstraints =
        @UniqueConstraint(columnNames = {"car_brand", "car_name", "fuel_type"}))
public class Car extends DomainObject<Long> {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "car_brand", nullable = false)
    @NotNull @Valid
    private CarBrand brand;

    @Column(name = "car_name", nullable = false, length = 50)
    @NotNull @Size(min = 1, max = 50)
    private String name;

    @Column(name = "maximal_velocity", nullable = false)
    @NotNull @Min(50) @Max(350)
    private Integer maxVelocity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "fuel_type", nullable = false)
    @NotNull @Valid
    private FuelType fuelType;

    @Column(name = "fuel_consumption", nullable = false)
    @NotNull @Min(0)
    private Double fuelConsumption;

    @ManyToMany(mappedBy = "ownCars", cascade = CascadeType.DETACH)
    private List<PathUser> owners;

    @Override
    public Long getId() {
        return id;
    }

    public CarBrand getBrand() {
        return brand;
    }

    public void setBrand(CarBrand brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMaxVelocity() {
        return maxVelocity;
    }

    public void setMaxVelocity(Integer maxVelocity) {
        this.maxVelocity = maxVelocity;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public Double getFuelConsumption() {
        return fuelConsumption;
    }

    public void setFuelConsumption(Double fuelConsumption) {
        this.fuelConsumption = fuelConsumption;
    }

    public List<PathUser> getOwners() {
        return owners;
    }

    public void setOwners(List<PathUser> owners) {
        this.owners = owners;
    }

    public String getBrandName() {
        return brand.getBrandName();
    }

    public String getFuelTypeName() {
        return fuelType.getFuelTypeName();
    }

    @PreRemove
    private void preRemove() {
        for (PathUser user : owners) {
            user.getOwnCars().remove(this);
        }
    }
}
