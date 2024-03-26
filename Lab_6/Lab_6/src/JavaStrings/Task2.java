package JavaStrings;

import java.util.*;

public class Task2 {
    public static void main(String[] args) {
        String text = "This is a sample text. It contains several sentences with different lengths. Some sentences are longer than others.";

        String[] sentences = text.split("[.!?]\\s*");

        Comparator<String> sentenceComparator = new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return countWords(s1) - countWords(s2);
            }

            private int countWords(String sentence) {
                return sentence.split("\\s+").length;
            }
        };

        Arrays.sort(sentences, sentenceComparator);

        System.out.println("Sentences sorted by word count:");
        for (String sentence : sentences) {
            System.out.println(sentence);
        }
    }
}
