package ssau.ru.graph;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.Serializable;

@Entity
@Table(name = "NODES")
public class PathNode implements Serializable {
    @Id @GeneratedValue
    @JsonInclude
    private Long id;

    @Embedded
    private PathLight light;

    @Embedded
    private NodePosition position;

    @ManyToOne
    @JoinColumn(name = "graph_owner")
    @JsonIgnore
    private PathGraph graph;

    public PathNode() {}

    public PathNode(PathGraph graph, PathLight light, NodePosition position) {
        this.graph = graph;
        this.light = light;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public PathLight getLight() {
        return light;
    }

    public void setLight(PathLight light) {
        this.light = light;
    }

    public NodePosition getPosition() {
        return position;
    }

    public void setPosition(NodePosition position) {
        this.position = position;
    }

    public PathGraph getGraph() {
        return graph;
    }

    public void setGraph(PathGraph graph) {
        this.graph = graph;
    }

    @Embeddable
    public static class PathLight {
        @Column(name = "red_phase")
        @Min(15)
        int redPhase;

        @Column(name = "green_phase")
        @Min(10) @Max(90)
        int greenPhase;

        public PathLight() {}

        public PathLight(int redPhase, int greenPhase) {
            this.redPhase = redPhase;
            this.greenPhase = greenPhase;
        }

        public int getRedPhase() {
            return redPhase;
        }

        public int getGreenPhase() {
            return greenPhase;
        }
    }

    @Embeddable
    public static class NodePosition {
        @Column(name = "x_pos")
        int x;

        @Column(name = "y_pos")
        int y;

        public NodePosition() {}

        public NodePosition(int x, int y) {
            this.x = x;
            this.y = y;
        }

        public int getX() {
            return x;
        }

        public int getY() {
            return y;
        }
    }
}
