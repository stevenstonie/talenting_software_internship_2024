namespace code.p1.req7
{
	public class Teacher(string firstName, string lastName, string personalNumericCode) : Person(firstName, lastName, personalNumericCode)
	{
		private List<Course> courses = [];

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
}