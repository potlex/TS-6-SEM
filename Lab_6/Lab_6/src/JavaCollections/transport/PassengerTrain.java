package JavaCollections.transport;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PassengerTrain {
    private List<PassengerCar> cars;

    public PassengerTrain() {
        this.cars = new ArrayList<>();
    }

    public void addCar(PassengerCar car) {
        cars.add(car);
    }

    public int getTotalPassengerCount() {
        int totalPassengers = 0;
        for (PassengerCar car : cars) {
            totalPassengers += car.getCapacity();
        }
        return totalPassengers;
    }

    public int getTotalBaggageCapacity() {
        int totalBaggageCapacity = 0;
        for (PassengerCar car : cars) {
            totalBaggageCapacity += car.getBaggageCapacity();
        }
        return totalBaggageCapacity;
    }

    public void sortCarsByComfortLevel() {
        Collections.sort(cars, (car1, car2) -> car2.getComfortLevel() - car1.getComfortLevel());
    }

    public List<PassengerCar> findCarsByPassengerCount(int minPassengers, int maxPassengers) {
        List<PassengerCar> matchingCars = new ArrayList<>();
        for (PassengerCar car : cars) {
            if (car.getCapacity() >= minPassengers && car.getCapacity() <= maxPassengers) {
                matchingCars.add(car);
            }
        }
        return matchingCars;
    }
}
