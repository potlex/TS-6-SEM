package JavaStrings;

import java.util.*;

public class Task3 {
    public static void main(String[] args) {
        String text = "Where are you? Can you drop me AWP? Drop me AWP! Ok, i hear you, gl.";
        String[] sentences = text.split("\\.");
        String[] firstSentenceWords = sentences[0].split("\\s+");
        Set<String> wordsInOtherSentences = new HashSet<>();
        for (int i = 1; i < sentences.length; i++) {
            wordsInOtherSentences.addAll(Arrays.asList(sentences[i].split("\\s+")));
        }
        for (String word : firstSentenceWords) {
            if (!wordsInOtherSentences.contains(word)) {
                System.out.println("Слово, которое есть в первом предложении, но отсутствует в остальных: " + word);
                break;
            }
        }
    }
}
