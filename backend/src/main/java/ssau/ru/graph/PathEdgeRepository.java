package ssau.ru.graph;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface PathEdgeRepository extends CrudRepository<PathEdge, PathEdge.EdgeInfo> {
}
