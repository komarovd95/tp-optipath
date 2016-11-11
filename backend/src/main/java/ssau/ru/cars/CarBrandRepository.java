package ssau.ru.cars;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CarBrandRepository extends CrudRepository<CarBrand, Long> {
    Page<CarBrand> findAllByBrandNameContainingIgnoreCase(
            @Param("brandName") String brandName, Pageable pageable);
}
