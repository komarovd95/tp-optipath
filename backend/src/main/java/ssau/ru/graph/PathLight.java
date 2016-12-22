package ssau.ru.graph;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Embeddable
public class PathLight {
    @Column(name = "red_phase")
    @Min(15) @Max(150)
    int redPhase;

    @Column(name = "green_phase")
    @Min(15) @Max(90)
    int greenPhase;

//        public PathLight() {}
//
//        public PathLight(int redPhase, int greenPhase) {
////            if (redPhase < 15 && redPhase > 150) {
////                throw new IllegalArgumentException("Red phase must be in [15; 150]. Given " + redPhase);
////            }
////
////            if (greenPhase < 15 && greenPhase > 90) {
////                throw new IllegalArgumentException("Green phase must be in [15; 90]. Given " + redPhase);
////            }
//
//            this.redPhase = redPhase;
//            this.greenPhase = greenPhase;
//        }

    public int getRedPhase() {
        return redPhase;
    }

    public int getGreenPhase() {
        return greenPhase;
    }

    public void setRedPhase(int redPhase) {
        this.redPhase = redPhase;
    }

    public void setGreenPhase(int greenPhase) {
        this.greenPhase = greenPhase;
    }
}