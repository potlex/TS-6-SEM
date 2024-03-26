package JavaIO;
import java.io.*;
import java.util.*;

public class StudentGradeProcessor {
    public static void main(String[] args) throws IOException {
        Map<String, List<Integer>> studentGrades = new HashMap<>();

        try (BufferedReader reader = new BufferedReader(new FileReader("studentGradeProcessorInput.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(" ");
                String name = parts[0];
                int grade = Integer.parseInt(parts[1]);

                if (!studentGrades.containsKey(name)) {
                    studentGrades.put(name, new ArrayList<>());
                }

                studentGrades.get(name).add(grade);
            }
        }

        try (PrintWriter writer = new PrintWriter(new FileWriter("studentGradeProcessorOutput.txt"))) {
            for (Map.Entry<String, List<Integer>> entry : studentGrades.entrySet()) {
                String name = entry.getKey();
                List<Integer> grades = entry.getValue();

                double average = grades.stream().mapToInt(Integer::intValue).average().orElse(0.0);

                if (average > 7) {
                    writer.println(name.toUpperCase());
                }
            }
        }
    }
}
