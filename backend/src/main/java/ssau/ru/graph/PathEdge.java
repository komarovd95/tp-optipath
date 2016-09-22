package ssau.ru.graph;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "EDGES")
public class PathEdge {
    @EmbeddedId
    private EdgeInfo info;

    @ManyToOne
    @JoinColumn(name = "graph_owner")
    @JsonIgnore
    private PathGraph graph;

    public PathEdge(PathGraph graph, EdgeInfo info) {
        this.graph = graph;
        this.info = info;
    }

    @Embeddable
    public static class EdgeInfo implements Serializable {
        @ManyToOne
        @JoinColumn(name = "edge_from")
        PathNode from;

        @ManyToOne
        @JoinColumn(name = "edge_to")
        PathNode to;

        public EdgeInfo(PathNode from, PathNode to) {
            this.from = from;
            this.to = to;
        }
    }
}
