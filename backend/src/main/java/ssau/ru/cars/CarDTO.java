package ssau.ru.cars;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.hateoas.core.Relation;
import ssau.ru.users.PathUser;

import java.util.Date;
import java.util.List;


@Relation(collectionRelation = "cars")
public class CarDTO extends Car {
    private boolean owned;
    private Date createdAt;
    private Date updatedAt;
    private Long id;

    public boolean getOwned() {
        return owned;
    }

    public void setOwned(boolean owned) {
        this.owned = owned;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public Date getCreatedAt() {
        return createdAt;
    }

    @Override
    public Date getUpdatedAt() {
        return updatedAt;
    }

    @Override
    @JsonIgnore
    public CarBrand getBrand() {
        return super.getBrand();
    }

    @Override
    @JsonIgnore
    public FuelType getFuelType() {
        return super.getFuelType();
    }

    @Override
    @JsonIgnore
    public List<PathUser> getOwners() {
        return super.getOwners();
    }

    public static CarDTO of(Car car) {
        CarDTO dto = new CarDTO();

        dto.createdAt = car.getCreatedAt();
        dto.updatedAt = car.getUpdatedAt();

        dto.setId(car.getId());
        dto.setName(car.getName());
        dto.setBrand(car.getBrand());
        dto.setOwners(car.getOwners());
        dto.setFuelType(car.getFuelType());
        dto.setMaxVelocity(car.getMaxVelocity());
        dto.setFuelConsumption(car.getFuelConsumption());

        return dto;
    }
}
