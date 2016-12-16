package ssau.ru.graph;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;

@RepositoryRestResource(exported = false)
public interface StreetRepository extends PagingAndSortingRepository<Street, Long> {
    Page<Street> findAllByStreetNameContainingIgnoreCaseAndStreetTypeIn(
            @Param("streetName") String streetName,
            @Param("streetTypes") String[] streetTypes,
            Pageable pageable);

    Page<Street> findAllByStreetNameContainingIgnoreCase(
            @Param("streetName") String streetName,
            Pageable pageable);

    @Query("select distinct s.streetType from ssau.ru.graph.Street s")
    Set<String> getAllTypes();
}
