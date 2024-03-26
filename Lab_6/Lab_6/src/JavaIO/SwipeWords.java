package JavaIO;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class SwipeWords {
    public static void main(String[] args) {
        String inputFile = "swipeWordsInput.txt";
        String outputFile = "swipeWordsOutput.txt";

        try {
            BufferedReader reader = new BufferedReader(new FileReader(inputFile));
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile));

            String line;
            while ((line = reader.readLine()) != null) {
                String[] words = line.trim().split("\\s+");
                if (words.length >= 2) {
                    String temp = words[0];
                    words[0] = words[words.length - 1];
                    words[words.length - 1] = temp;
                    StringBuilder swappedLine = new StringBuilder();
                    for (String word : words) {
                        swappedLine.append(word).append(" ");
                    }
                    writer.write(swappedLine.toString().trim());
                    writer.newLine();
                } else {
                    writer.write(line);
                    writer.newLine();
                }
            }

            reader.close();
            writer.close();

            System.out.println("Processing completed. Result written to file: " + outputFile);
        } catch (IOException e) {
            System.err.println("Error processing the file: " + e.getMessage());
        }
    }
}