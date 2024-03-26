package JavaCollections.transport;

public class PassengerCar extends TrainCar {
    private int comfortLevel; // уровень комфортности

    public PassengerCar(int capacity, int baggageCapacity, int comfortLevel) {
        super(capacity, baggageCapacity);
        this.comfortLevel = comfortLevel;
    }

    @Override
    public int getComfortLevel() {
        return comfortLevel;
    }
}