package ssau.ru.graph;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Table(name = "EDGES")
public class PathEdge {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "edge_from")
    private PathNode from;

    @ManyToOne(optional = false)
    @JoinColumn(name = "edge_to")
    private PathNode to;

    @ManyToOne(optional = false)
    @JoinColumn(name = "graph_owner")
    @JsonIgnore
    private PathGraph graph;

    @Column(name = "edge_length")
    @Min(100) @Max(50000)
    private int length;

    @Column(name = "edge_lanes")
    @Min(1) @Max(10)
    private int lanes;

    @Column(name = "edge_limit")
    @Min(1) @Max(120)
    private int limit;

    @ManyToOne
    private CoverType coverType;

    @ManyToOne
    private Street street;

    @Column(name = "edge_directed")
    private boolean directed;

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

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getLanes() {
        return lanes;
    }

    public void setLanes(int lanes) {
        this.lanes = lanes;
    }

    public CoverType getCoverType() {
        return coverType;
    }

    public void setCoverType(CoverType coverType) {
        this.coverType = coverType;
    }

    public Street getStreet() {
        return street;
    }

    public void setStreet(Street street) {
        this.street = street;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public boolean isDirected() {
        return directed;
    }

    public void setDirected(boolean directed) {
        this.directed = directed;
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
