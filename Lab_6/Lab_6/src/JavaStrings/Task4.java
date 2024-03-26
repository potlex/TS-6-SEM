package JavaStrings;

import java.util.*;

public class Task4 {
    public static void main(String[] args) {
        String text = "Where are you? Can you drop meeee AWP? Drop me AWP! Ok, i hear you, gl.";
        int wordLength = 5;
        String[] sentences = text.split("\\.");
        Set<String> uniqueWords = new HashSet<>();
        for (String sentence : sentences) {
            if (sentence.contains("?")) {
                String[] words = sentence.split("\\s+");
                for (String word : words) {
                    if (word.length() == wordLength) {
                        uniqueWords.add(word);
                    }
                }
            }
        }
        System.out.println("Уникальные слова заданной длины в вопросительных предложениях: " + uniqueWords);
    }
}
