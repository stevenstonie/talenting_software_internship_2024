namespace code.p1.req7
{
	public class Course(string courseName, int availableSeats)
    {
        public string CourseName { get; set; } = courseName;
        public int AvailableSeats { get; set; } = availableSeats;

        public override string ToString()
		{
			return CourseName;
		}
	}
}