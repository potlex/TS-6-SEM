import JavaCollections.transport.PassengerCar;
import JavaCollections.transport.PassengerTrain;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class MainTask {
    public static void main(String[] args) {
        PassengerTrain train = new PassengerTrain();

        try {
            File file = new File("train_inits.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] params = line.split(",");
                int capacity = Integer.parseInt(params[0]);
                int baggageCapacity = Integer.parseInt(params[1]);
                int comfortLevel = Integer.parseInt(params[2]);
                train.addCar(new PassengerCar(capacity, baggageCapacity, comfortLevel));
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            System.out.println("File with train parameters not found.");
            e.printStackTrace();
        }

        System.out.println("Total number of passengers in the train: " + train.getTotalPassengerCount());
        System.out.println("Total baggage capacity in the train: " + train.getTotalBaggageCapacity());

        train.sortCarsByComfortLevel();
        System.out.println("Train cars sorted by comfort level.");

        System.out.println("Cars accommodating from 50 to 100 passengers:");
        for (PassengerCar car : train.findCarsByPassengerCount(50, 100)) {
            System.out.println("Passenger car with capacity: " + car.getCapacity());
        }
    }
}
