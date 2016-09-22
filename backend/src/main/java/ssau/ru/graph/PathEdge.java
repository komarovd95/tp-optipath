package ssau.ru.graph;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;

@Entity
@Table(name = "EDGES")
public class PathEdge {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "edge_from")
    private PathNode from;

    @ManyToOne
    @JoinColumn(name = "edge_to")
    private PathNode to;

    @ManyToOne
    @JoinColumn(name = "graph_owner")
    private PathGraph graph;

    public PathEdge() {}

    public PathEdge(PathGraph graph, PathNode from, PathNode to) {
        this.graph = graph;
        this.from = from;
        this.to = to;
    }

    public Long getId() {
        return id;
    }

    @JsonIgnore
    public PathNode getFrom() {
        return from;
    }

    public void setFrom(PathNode from) {
        this.from = from;
    }

    @JsonIgnore
    public PathNode getTo() {
        return to;
    }

    public void setTo(PathNode to) {
        this.to = to;
    }

    public PathGraph getGraph() {
        return graph;
    }

    public void setGraph(PathGraph graph) {
        this.graph = graph;
    }

    @JsonProperty("from")
    public Long getFromId() {
        return from == null ? null : from.getId();
    }

    @JsonProperty("to")
    public Long getToId() {
        return to == null ? null : to.getId();
    }
}
