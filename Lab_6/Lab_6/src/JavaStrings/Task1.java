package JavaStrings;

import java.util.*;

public class Task1 {
    public static void main(String[] args) {
        String text = "In this text, we are searching for sentences where words repeat. This sentence contains a repeating word word. There is also another sentence here where the word sentence repeats.";

        String[] sentences = text.split("[.!?]\\s*"); 
        int maxCount = 0;

        for (String sentence : sentences) {
            String[] words = sentence.split("\\s+");
            Set<String> uniqueWords = new HashSet<>(Arrays.asList(words));
                                                                        

            if (uniqueWords.size() < words.length) { 
                System.out.println("Sentence with repeating words: " + sentence);
                maxCount++;
            }
        }

        System.out.println("Maximum number of sentences with the same words: " + maxCount);
    }
}

