package JavaCollections.transport;

public abstract class TrainCar {
    private int capacity; // вместимость пассажиров
    private int baggageCapacity; // вместимость багажа

    public TrainCar(int capacity, int baggageCapacity) {
        this.capacity = capacity;
        this.baggageCapacity = baggageCapacity;
    }

    public int getCapacity() {
        return capacity;
    }

    public int getBaggageCapacity() {
        return baggageCapacity;
    }

    public abstract int getComfortLevel();
}
