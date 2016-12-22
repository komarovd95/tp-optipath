package ssau.ru.graph;

public class NodesWrapper {
    private PathNode[] nodes;
    private PathNode node;

    public PathNode[] getNodes() {
        return nodes;
    }

    public void setNodes(PathNode[] nodes) {
        this.nodes = nodes;
    }

    public PathNode getNode() {
        return node;
    }

    public void setNode(PathNode node) {
        this.node = node;
    }
}
