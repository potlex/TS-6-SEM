package JavaThreads;
import java.util.concurrent.*;

class ParkingLot {
    private final Semaphore semaphore;

    public ParkingLot(int capacity) {
        this.semaphore = new Semaphore(capacity, true);
    }

    public boolean parkCar(long maxWaitTimeMillis) throws InterruptedException {
        return semaphore.tryAcquire(maxWaitTimeMillis, TimeUnit.MILLISECONDS);
    }

    public void leaveParkingLot() {
        semaphore.release();
    }

    public int getAvailableParkingSpaces() {
        return semaphore.availablePermits();
    }
}

class Car implements Runnable {
    private final String name;
    private final ParkingLot parkingLot;
    private final long maxWaitTimeMillis;

    public Car(String name, ParkingLot parkingLot, long maxWaitTimeMillis) {
        this.name = name;
        this.parkingLot = parkingLot;
        this.maxWaitTimeMillis = maxWaitTimeMillis;
    }

    @Override
    public void run() {
        try {
            if (parkingLot.parkCar(maxWaitTimeMillis)) {
                System.out.println(name + " parked successfully");
                Thread.sleep((long) (Math.random() * 5000));
                parkingLot.leaveParkingLot();
                System.out.println(name + " left the parking lot");
            } else {
                System.out.println(name + " couldn't find a parking space and left");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

public class MainTask {
    public static void main(String[] args) {
        int parkingCapacity = 3;
        ParkingLot parkingLot = new ParkingLot(parkingCapacity);

        Thread[] cars = new Thread[5];
        for (int i = 0; i < cars.length; i++) {
            cars[i] = new Thread(new Car("Car " + (i + 1), parkingLot, 2000));
            cars[i].start();
        }

        for (Thread car : cars) {
            try {
                car.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("All cars have finished parking");
    }
}
