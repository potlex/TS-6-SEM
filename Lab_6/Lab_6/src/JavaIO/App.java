package JavaIO;
import java.io.*;
import java.util.*;

public class App {
    public static void main(String[] args) throws IOException {
        List<Integer> numbers = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < 100; i++) {
            numbers.add(random.nextInt(100));
        }

        Collections.sort(numbers);

        try (PrintWriter out = new PrintWriter(new FileWriter("appNumbers.txt"))) {
            for (Integer number : numbers) {
                out.println(number);
            }
        }
    }
}
