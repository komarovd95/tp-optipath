package ssau.ru.graph;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class NodePosition {
    @Column(name = "x_pos")
    int x;

    @Column(name = "y_pos")
    int y;

//        public NodePosition() {}
//
//        public NodePosition(int x, int y) {
//            this.x = x;
//            this.y = y;
//        }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }
}
