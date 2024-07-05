namespace code
{
    public abstract class Person(string firstName, string lastName, string personalNumericCode)
    {
        public string FirstName { get; set; } = firstName;

        public string LastName { get; set; } = lastName;

        public string PersonalNumericCode { get; set; } = personalNumericCode;

        public abstract void DisplayDetails();
    }

    public class Student : Person
    {
        private List<Course> Courses { get; set; }
        private Dictionary<Course, int> Grades { get; set; }

        public Student(string firstName, string lastName, string personalNumericCode) : base(firstName, lastName, personalNumericCode)
        {
            Courses = [];
            Grades = [];
        }

        public void EnrollInCourse(Course course)
        {
            Courses.Add(course);
        }

        public void AddGrade(Course course, int grade)
        {
            if (Courses.Contains(course))
            {
                Grades[course] = grade;
            }
            else
            {
                Console.WriteLine("Student is not enrolled in this course");
            }
        }

        public override void DisplayDetails()
        {
            Console.WriteLine($"Student: {FirstName} {LastName} (personal numeric code: {PersonalNumericCode})");

            Console.WriteLine("Enrolled in the following courses: ");
            foreach (Course course in Courses)
            {
                string grade = Grades.TryGetValue(course, out int value) ? value.ToString() : "N/A";
                Console.WriteLine($"{course.CourseName}, Grade: {grade}");
            }
        }
    }

    public class Teacher : Person
    {
        private List<Course> courses;

        public Teacher(string firstName, string lastName, string personalNumericCode) : base(firstName, lastName, personalNumericCode)
        {
            courses = [];
        }

        public void AddCourse(Course course)
        {
            courses.Add(course);
        }

        public override void DisplayDetails()
        {
            Console.WriteLine($"Teacher: {FirstName} {LastName} (personal numeric code: {PersonalNumericCode})");

            Console.WriteLine($"Has the following courses: {string.Join(", ", courses)}");
        }
    }

    public class Course
    {
        public string CourseName { get; set; }
        public int AvailableSeats { get; set; }

        public Course(string courseName, int availableSeats)
        {
            CourseName = courseName;
            AvailableSeats = availableSeats;
        }

        public override string ToString()
        {
            return CourseName;
        }
    }
}