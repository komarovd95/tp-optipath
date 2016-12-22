package ssau.ru.graph;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "edges", collectionResourceRel = "edges",
        itemResourceRel = "edge")
public interface PathEdgeRepository extends CrudRepository<PathEdge, Long> {
}
