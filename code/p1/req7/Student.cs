namespace code.p1.req7
{
	public class Student(string firstName, string lastName, string personalNumericCode) : Person(firstName, lastName, personalNumericCode)
	{
        private List<Course> Courses { get; set; } = [];
        private Dictionary<Course, int> Grades { get; set; } = [];

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
}