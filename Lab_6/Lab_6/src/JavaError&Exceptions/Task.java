import java.util.ArrayList;
import java.util.List;

class Subject {
    private String name;
    private int grade;

    public Subject(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public int getGrade() {
        return grade;
    }
}

class Student {
    private String name;
    private List<Subject> subjects;

    public Student(String name) {
        this.name = name;
        this.subjects = new ArrayList<>();
    }

    public void addSubject(Subject subject) {
        subjects.add(subject);
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public String getName() {
        return name;
    }

    public double calculateAverageGrade() {
        if (subjects.isEmpty()) {
            throw new IllegalArgumentException("Student has no subjects");
        }

        int sum = 0;
        for (Subject subject : subjects) {
            if (subject.getGrade() < 0 || subject.getGrade() > 10) {
                throw new IllegalArgumentException("Invalid grade for subject " + subject.getName());
            }
            sum += subject.getGrade();
        }
        return (double) sum / subjects.size();
    }
}

class Group {
    private String name;
    private List<Student> students;

    public Group(String name) {
        this.name = name;
        this.students = new ArrayList<>();
    }

    public void addStudent(Student student) {
        students.add(student);
    }

    public List<Student> getStudents() {
        return students;
    }

    public String getName() {
        return name;
    }

    public double calculateAverageGradeForSubject(String subjectName) {
        if (students.isEmpty()) {
            throw new IllegalArgumentException("No students in the group");
        }

        int sum = 0;
        int count = 0;
        for (Student student : students) {
            for (Subject subject : student.getSubjects()) {
                if (subject.getName().equals(subjectName)) {
                    sum += subject.getGrade();
                    count++;
                    break;
                }
            }
        }
        if (count == 0) {
            throw new IllegalArgumentException("No grades for subject " + subjectName + " in the group");
        }
        return (double) sum / count;
    }
}

class Faculty {
    private String name;
    private List<Group> groups;

    public Faculty(String name) {
        this.name = name;
        this.groups = new ArrayList<>();
    }

    public void addGroup(Group group) {
        groups.add(group);
    }

    public List<Group> getGroups() {
        return groups;
    }

    public String getName() {
        return name;
    }

    public double calculateAverageGradeForSubject(String subjectName) {
        if (groups.isEmpty()) {
            throw new IllegalArgumentException("No groups in the faculty");
        }

        int sum = 0;
        int count = 0;
        for (Group group : groups) {
            try {
                sum += group.calculateAverageGradeForSubject(subjectName);
                count++;
            } catch (IllegalArgumentException e) {
            }
        }
        if (count == 0) {
            throw new IllegalArgumentException("No grades for subject " + subjectName + " in the faculty");
        }
        return (double) sum / count;
    }
}

class University {
    private String name;
    private List<Faculty> faculties;

    public University(String name) {
        this.name = name;
        this.faculties = new ArrayList<>();
    }

    public void addFaculty(Faculty faculty) {
        faculties.add(faculty);
    }

    public List<Faculty> getFaculties() {
        return faculties;
    }

    public String getName() {
        return name;
    }

    public double calculateAverageGradeForSubject(String subjectName) {
        if (faculties.isEmpty()) {
            throw new IllegalArgumentException("No faculties in the university");
        }
        int sum = 0;
        int count = 0;
        for (Faculty faculty : faculties) {
            try {
                sum += faculty.calculateAverageGradeForSubject(subjectName);
                count++;
            } catch (IllegalArgumentException e) {
            }
        }
        if (count == 0) {
            throw new IllegalArgumentException("No grades for subject " + subjectName + " in the university");
        }
        return (double) sum / count;
    }
}

public class Task {
    public static void main(String[] args) {
        University university = new University("My University");

        Faculty engineeringFaculty = new Faculty("Engineering Faculty");
        Faculty humanitiesFaculty = new Faculty("Humanities Faculty");

        university.addFaculty(engineeringFaculty);
        university.addFaculty(humanitiesFaculty);

        Group engineeringGroup1 = new Group("Engineering Group 1");
        Group engineeringGroup2 = new Group("Engineering Group 2");
        Group humanitiesGroup1 = new Group("Humanities Group 1");

        engineeringFaculty.addGroup(engineeringGroup1);
        engineeringFaculty.addGroup(engineeringGroup2);
        humanitiesFaculty.addGroup(humanitiesGroup1);

        Student student1 = new Student("John");
        student1.addSubject(new Subject("Math", 9));
        student1.addSubject(new Subject("Physics", 8));
        engineeringGroup1.addStudent(student1);

        Student student2 = new Student("Alice");
        student2.addSubject(new Subject("Math", 7));
        student2.addSubject(new Subject("Physics", 6));
        engineeringGroup1.addStudent(student2);

        Student student3 = new Student("Emily");
        student3.addSubject(new Subject("Literature", 8));
        student3.addSubject(new Subject("History", 7));
        humanitiesGroup1.addStudent(student3);

        double averageGradeForStudent1 = student1.calculateAverageGrade();
        System.out.println("Average grade for " + student1.getName() + ": " + averageGradeForStudent1);

        double averageGradeForMathInEngineeringGroup1 = engineeringGroup1.calculateAverageGradeForSubject("Math");
        System.out.println("Average grade for Math in Engineering Group 1: " + averageGradeForMathInEngineeringGroup1);

        double averageGradeForPhysicsInEngineeringFaculty = engineeringFaculty
                .calculateAverageGradeForSubject("Physics");
        System.out.println(
                "Average grade for Physics in Engineering Faculty: " + averageGradeForPhysicsInEngineeringFaculty);

        double averageGradeForLiteratureInUniversity = university.calculateAverageGradeForSubject("Literature");
        System.out.println("Average grade for Literature in the university: " + averageGradeForLiteratureInUniversity);
    }
}