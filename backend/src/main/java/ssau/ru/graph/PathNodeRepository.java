package ssau.ru.graph;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "nodes", collectionResourceRel = "nodes",
        itemResourceRel = "node")
public interface PathNodeRepository extends CrudRepository<PathNode, Long> {
}
