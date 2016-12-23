package ssau.ru.graph;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

//@Entity
//@Table(name = "NODES")
public class PathNode implements Serializable {
//    @Id @GeneratedValue
//    private Long id;
//
//    @Embedded @Valid
//    private PathLight light;
//
//    @Embedded
//    @NotNull
//    private NodePosition position;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "graph_owner")
//    @JsonIgnore
//    private PathGraph graph;
//
////    public PathNode(PathGraph graph, PathLight light, NodePosition position) {
////        this.graph = graph;
////        this.light = light;
////        this.position = position;
////    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public PathLight getLight() {
//        return light;
//    }
//
//    public void setLight(PathLight light) {
//        this.light = light;
//    }
//
//    public NodePosition getPosition() {
//        return position;
//    }
//
//    public void setPosition(NodePosition position) {
//        this.position = position;
//    }
//
//    public PathGraph getGraph() {
//        return graph;
//    }
//
//    public void setGraph(PathGraph graph) {
//        this.graph = graph;
//    }

    @NotNull
    private String id;

    private int x;

    private int y;

    @Valid
    private PathLight light;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public PathLight getLight() {
        return light;
    }

    public void setLight(PathLight light) {
        this.light = light;
    }
}
