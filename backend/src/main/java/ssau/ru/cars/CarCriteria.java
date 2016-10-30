package ssau.ru.cars;

class CarCriteria {
    private String name;
    private String brand;
    private String fuelType;
    private String fuelConsumption;
    private String maxVelocity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getFuelConsumption() {
        return fuelConsumption;
    }

    public void setFuelConsumption(String fuelConsumption) {
        this.fuelConsumption = fuelConsumption;
    }

    public String getMaxVelocity() {
        return maxVelocity;
    }

    public void setMaxVelocity(String maxVelocity) {
        this.maxVelocity = maxVelocity;
    }
}
