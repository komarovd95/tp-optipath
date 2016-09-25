package ssau.ru.graph;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.LastModifiedDate;
import ssau.ru.users.PathUser;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.*;

@Entity
@Table(name = "GRAPHS", uniqueConstraints = @UniqueConstraint(columnNames = {"graph_name", "graph_owner"}))
public class PathGraph {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "graph_name", length = 50)
    @Size(min = 1, max = 50) @Pattern(regexp = "^[\\p{L}\\d\\s]+$")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "graph_owner")
    @JsonIgnore
    private PathUser owner;

    @OneToMany(mappedBy = "graph", cascade = CascadeType.ALL)
    @Size(min = 2) @Valid
    private List<PathNode> nodes;

    @OneToMany(mappedBy = "graph", cascade = CascadeType.ALL)
    @Size(min = 1) @Valid
    private List<PathEdge> edges;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Past
    private Date updateAt;

    public PathGraph() {
        nodes = new ArrayList<>();
        edges = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name == null ? "graph" + id : name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PathUser getOwner() {
        return owner;
    }

    public void setOwner(PathUser owner) {
        this.owner = Objects.requireNonNull(owner);
    }

    public List<PathNode> getNodes() {
        return Collections.unmodifiableList(nodes);
    }

    public void setNodes(List<PathNode> nodes) {
        this.nodes = new ArrayList<>(nodes);
    }

    public void addNode(PathNode node) {
        nodes.add(Objects.requireNonNull(node));
    }

    public List<PathEdge> getEdges() {
        return Collections.unmodifiableList(edges);
    }

    public void setEdges(List<PathEdge> edges) {
        this.edges = new ArrayList<>(edges);
    }

    public void addEdge(PathEdge edge) {
        edges.add(Objects.requireNonNull(edge));
    }

    public Date getUpdateAt() {
        return updateAt == null ? null : new Date(updateAt.getTime());
    }

    public void setUpdateAt(Date date) {
        this.updateAt = new Date(Objects.requireNonNull(date).getTime());
    }

    @PostPersist
    @PostUpdate
    private void update() {
        this.updateAt = new Date();
    }
}
