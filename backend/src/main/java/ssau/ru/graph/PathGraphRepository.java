package ssau.ru.graph;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PathGraphRepository extends PagingAndSortingRepository<PathGraph, Long> {
    PathGraph findByName(String name);
}
