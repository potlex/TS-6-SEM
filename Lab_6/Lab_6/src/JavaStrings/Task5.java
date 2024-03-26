package JavaStrings;

public class Task5 {
    public static void main(String[] args) {
        String text = "Where are you. Can you drop me AWP. Drop me AWP. Ok, i hear you, gl.";
        String[] sentences = text.split("\\.");
        for (String sentence : sentences) {
            String[] words = sentence.trim().split("\\s+");
            String temp = words[0];
            words[0] = words[words.length - 1];
            words[words.length - 1] = temp;
            System.out.println(String.join(" ", words) + ".");
        }
    }
}
