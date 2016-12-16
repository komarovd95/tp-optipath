package ssau.ru.graph;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface CoverTypeRepository
        extends PagingAndSortingRepository<CoverType, Long> {
    Page<CoverType> findAllByCoverTypeNameContainingIgnoreCase(
            @Param("coverTypeName") String coverTypeName, Pageable pageable);
}
