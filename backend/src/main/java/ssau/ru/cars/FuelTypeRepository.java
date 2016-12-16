package ssau.ru.cars;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface FuelTypeRepository extends CrudRepository<FuelType, Long> {
    Page<FuelType> findAllByFuelTypeNameContainingIgnoreCase(
            @Param("fuelTypeName") String fuelTypeName, Pageable pageable);
}
