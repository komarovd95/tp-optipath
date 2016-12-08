package ssau.ru.graph;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import ssau.ru.users.PathUser;

@RepositoryRestResource(path = "routes", collectionResourceRel = "routes",
        itemResourceRel = "route")
public interface PathGraphRepository extends PagingAndSortingRepository<PathGraph, Long> {
    PathGraph findByName(@Param("name") String name);
    Page<PathGraph> findAllByOwnerAndNameContainingIgnoreCase(
            @Param("owner") PathUser owner, @Param("name") String name,
            Pageable pageable);
    Page<PathGraph> findAllByNameContainingIgnoreCase(@Param("name") String name,
                                                      Pageable pageable);
}
