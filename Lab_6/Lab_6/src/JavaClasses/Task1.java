package JavaClasses;
import java.util.ArrayList;
import java.util.List;

class Student {
    private int id;
    private String lastName;
    private String firstName;
    private String middleName;
    private String birthDate;
    private String address;
    private String phoneNumber;
    private String faculty;
    private int course;
    private String group;

    public Student(int id, String lastName, String firstName, String middleName, String birthDate, String address,
            String phoneNumber, String faculty, int course, String group) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.faculty = faculty;
        this.course = course;
        this.group = group;
    }

    public int getId() {
        return id;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public String getAddress() {
        return address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getFaculty() {
        return faculty;
    }

    public int getCourse() {
        return course;
    }

    public String getGroup() {
        return group;
    }
}

public class Task1 {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student(1, "Ivanov", "Ivan", "Ivanovich", "01.01.2000", "Pushkin St., 10", "1234567890",
                "Faculty1", 1, "Group1"));
        students.add(new Student(2, "Petrov", "Petr", "Petrovich", "02.02.2001", "Lermontov St., 20", "0987654321",
                "Faculty2", 2, "Group2"));
        students.add(new Student(3, "Sidorov", "Sidor", "Sidorovich", "03.03.2002", "Gogol St., 30", "1357924680",
                "Faculty1", 1, "Group1"));
        students.add(new Student(4, "Kuznetsov", "Kuznet", "Kuznetsovich", "04.04.2003", "Chekhov St., 40",
                "2468013579", "Faculty2", 2, "Group2"));

        String desiredFaculty = "Faculty1";
        System.out.println("Students of " + desiredFaculty + " faculty:");
        for (Student student : students) {
            if (student.getFaculty().equals(desiredFaculty)) {
                System.out
                        .println(student.getLastName() + " " + student.getFirstName() + " " + student.getMiddleName());
            }
        }

        System.out.println("\nStudents by faculties and courses:");
        for (Student student : students) {
            System.out.println(student.getFaculty() + ", Course " + student.getCourse() + ": " + student.getLastName()
                    + " " + student.getFirstName() + " " + student.getMiddleName());
        }

        int desiredYear = 2001;
        System.out.println("\nStudents born after the year " + desiredYear + ":");
        for (Student student : students) {
            int birthYear = Integer.parseInt(student.getBirthDate().split("\\.")[2]);
            if (birthYear > desiredYear) {
                System.out
                        .println(student.getLastName() + " " + student.getFirstName() + " " + student.getMiddleName());
            }
        }

        String desiredGroup = "Group1";
        System.out.println("\nStudents of group " + desiredGroup + ":");
        for (Student student : students) {
            if (student.getGroup().equals(desiredGroup)) {
                System.out
                        .println(student.getLastName() + " " + student.getFirstName() + " " + student.getMiddleName());
            }
        }
    }
}