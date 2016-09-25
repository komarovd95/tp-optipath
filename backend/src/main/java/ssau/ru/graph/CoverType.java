package ssau.ru.graph;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CoverType {
    SAND(0.3, "Песок"),
    SOIL(0.5, "Грунт"),
    BREAKSTONE(0.6, "Щебень"),
    GRAVEL(0.8, "Гравий"),
    CONCRETE(1.0, "Бетон"),
    ASPHALT(1.0, "Асфальт");

    private final double slowdownCoefficient;
    private final String representName;

    CoverType(double slowdownCoefficient, String representName) {
        this.slowdownCoefficient = slowdownCoefficient;
        this.representName = representName;
    }

    @JsonProperty("slowdown")
    public double getSlowdownCoefficient() {
        return slowdownCoefficient;
    }

    @JsonProperty("name")
    public String getRepresentName() {
        return representName;
    }

    @Override
    public String toString() {
        return representName;
    }
}
