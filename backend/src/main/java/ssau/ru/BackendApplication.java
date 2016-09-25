package ssau.ru;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;
import ssau.ru.graph.*;
import ssau.ru.users.PathUser;
import ssau.ru.users.PathUserRepository;

import java.util.Collections;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    @Autowired
    public BackendApplication(PathUserRepository userRepository, PathGraphRepository graphRepository,
                              PathNodeRepository nodeRepository, PathEdgeRepository edgeRepository) {
        this.userRepository = userRepository;
        this.graphRepository = graphRepository;
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	private final PathUserRepository userRepository;

    private final PathGraphRepository graphRepository;

    private final PathNodeRepository nodeRepository;

    private final PathEdgeRepository edgeRepository;

	@Override
    @Transactional
	public void run(String... args) throws Exception {
	    PathUser user = new PathUser("diman", "diman", "ROLE_USER");

        PathGraph graph = new PathGraph();
        user.addPathGraph(graph);
        graph.setOwner(user);

        PathNode node = new PathNode(graph, new PathNode.PathLight(15, 20), new PathNode.NodePosition(0, 10));
        graph.addNode(node);
        node.setGraph(graph);

        PathNode node1 = new PathNode(graph, new PathNode.PathLight(15, 15), new PathNode.NodePosition(100, 100));
        graph.addNode(node1);
        node1.setGraph(graph);

        PathEdge edge = new PathEdge(graph, node, node1);
        edge.setCoverType(CoverType.BREAKSTONE);
        edge.setLength(100);
        edge.setLanes(3);
        graph.addEdge(edge);
        edge.setGraph(graph);

        userRepository.save(user);
        graphRepository.save(graph);
        nodeRepository.save(node);
        nodeRepository.save(node1);
        edgeRepository.save(edge);

        for (PathUser u : userRepository.findAll()) {
            System.out.println(u.getUsername() + " : " + u.getPathGraphs());
        }
    }
}
