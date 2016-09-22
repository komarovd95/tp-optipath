package ssau.ru.graph;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.annotation.JsonValueInstantiator;
import com.fasterxml.jackson.databind.jsonschema.JsonSerializableSchema;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.*;
import java.io.IOException;

@Entity
@Table(name = "EDGES")
public class PathEdge {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "edge_from")
//    @JsonIgnore
    private PathNode from;

    @ManyToOne
    @JoinColumn(name = "edge_to")
//    @JsonIgnore
    private PathNode to;

    @ManyToOne
    @JoinColumn(name = "graph_owner")
    @JsonIgnore
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

    @JsonSerialize(using = NodeSerializer.class)
    public PathNode getFrom() {
        return from;
    }

    public void setFrom(PathNode from) {
        this.from = from;
    }

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

    public static class NodeSerializer extends StdSerializer<PathNode> {
        public NodeSerializer() {
            this(null);
        }

        protected NodeSerializer(Class<PathNode> t) {
            super(t);
        }

        @Override
        public void serialize(PathNode value, JsonGenerator gen, SerializerProvider provider) throws IOException {
            gen.writeNumber(value.getId());
        }
    }
}
