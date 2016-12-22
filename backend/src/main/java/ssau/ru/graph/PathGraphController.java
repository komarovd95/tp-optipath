package ssau.ru.graph;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.EntityLinks;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@BasePathAwareController
public class PathGraphController {
    private final PathEdgeRepository edgeRepository;
    private final PathGraphRepository graphRepository;
    private final PathNodeRepository nodeRepository;
    private final EntityLinks entityLinks;

    @Autowired
    public PathGraphController(PathNodeRepository nodeRepository,
                               EntityLinks entityLinks,
                               PathGraphRepository graphRepository,
                               PathEdgeRepository edgeRepository) {
        this.nodeRepository = nodeRepository;
        this.entityLinks = entityLinks;
        this.graphRepository = graphRepository;
        this.edgeRepository = edgeRepository;
    }

    @RequestMapping(value = "/routes/{id}/createNodes", method = RequestMethod.POST)
    @ResponseBody
    public Resources<Resource<PathNode>> createNodes(@RequestBody NodesWrapper wrapper,
                                                     @PathVariable("id") PathGraph graph) {
        for (PathNode node : wrapper.getNodes()) {
            node.setGraph(graph);
        }
        List<PathNode> savedNodes = new ArrayList<>();
        nodeRepository.save(Arrays.asList(wrapper.getNodes())).forEach(savedNodes::add);

        graph.setNodes(savedNodes);
        graphRepository.save(graph);

        return new Resources<>(savedNodes.stream()
                .map(node -> new Resource<>(node, entityLinks
                        .linkToSingleResource(PathNode.class, node.getId())
                        .withSelfRel())).collect(Collectors.toList()),
                entityLinks.linkToCollectionResource(PathNode.class));
    }

    @RequestMapping(value = "/api/routes/{id}/updateNodes", method = RequestMethod.PATCH)
    @ResponseBody
    public Resources<Resource<PathNode>> updateNodes(@PathVariable("id") Long id,
                                               @RequestBody List<PathNode> nodes) {
        PathGraph graph = graphRepository.findOne(id);

        Iterable<PathNode> fetchedNodes = nodeRepository.findAll(nodes.stream()
                .map(PathNode::getId).collect(Collectors.toList()));

        int i = 0;
        for (PathNode node : fetchedNodes) {
            PathNode newNode = nodes.get(i++);

            node.setLight(newNode.getLight());
            node.setPosition(newNode.getPosition());
        }

        List<PathNode> savedNodes = new ArrayList<>();
        nodeRepository.save(fetchedNodes).forEach(savedNodes::add);

        graph.setNodes(savedNodes);
        graphRepository.save(graph);

        return new Resources<>(savedNodes.stream()
                .map(node -> new Resource<>(node, entityLinks
                        .linkToSingleResource(PathNode.class, node.getId())
                        .withSelfRel())).collect(Collectors.toList()),
                entityLinks.linkToCollectionResource(PathNode.class));
    }

    @RequestMapping(value = "/api/routes/{id}/createEdges", method = RequestMethod.POST)
    @ResponseBody
    public Resources<Resource<PathEdge>> createEdges(@PathVariable("id") Long id,
                                                     @RequestBody List<PathEdge> edges) {
        PathGraph graph = graphRepository.findOne(id);

        for (PathEdge edge : edges) {
            edge.setGraph(graph);
        }

        List<PathEdge> savedEdges = new ArrayList<>();
        edgeRepository.save(edges).forEach(savedEdges::add);

        graph.setEdges(savedEdges);
        graphRepository.save(graph);

        return new Resources<>(savedEdges.stream()
                .map(edge -> new Resource<>(edge, entityLinks
                        .linkToSingleResource(PathEdge.class, edge.getId())
                        .withSelfRel())).collect(Collectors.toList()),
                entityLinks.linkToCollectionResource(PathEdge.class));
    }

    @RequestMapping(value = "/api/routes/{id}/updateEdges", method = RequestMethod.PATCH)
    @ResponseBody
    public Resources<Resource<PathEdge>> updateEdges(@PathVariable("id") Long id,
                                                     @RequestBody List<PathEdge> edges) {
        PathGraph graph = graphRepository.findOne(id);

        Iterable<PathEdge> fetchedEdges = edgeRepository.findAll(edges.stream()
                .map(PathEdge::getId).collect(Collectors.toList()));

        int i = 0;
        for (PathEdge edge : fetchedEdges) {
            PathEdge newEdge = edges.get(i++);

            edge.setDirected(newEdge.isDirected());
            edge.setLength(newEdge.getLength());
            edge.setLimit(newEdge.getLimit());
            edge.setCoverType(newEdge.getCoverType());
            edge.setFrom(newEdge.getFrom());
            edge.setTo(newEdge.getTo());
            edge.setStreet(newEdge.getStreet());
        }

        List<PathEdge> savedEdges = new ArrayList<>();
        edgeRepository.save(fetchedEdges).forEach(savedEdges::add);

        graph.setEdges(savedEdges);
        graphRepository.save(graph);

        return new Resources<>(savedEdges.stream()
                .map(edge -> new Resource<>(edge, entityLinks
                        .linkToSingleResource(PathEdge.class, edge.getId())
                        .withSelfRel())).collect(Collectors.toList()),
                entityLinks.linkToCollectionResource(PathEdge.class));
    }
}
