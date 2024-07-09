namespace code.p2.req1
{
	public class Dog(DogBreed breed, DateTime birthDate) : Animal<DogBreed>(breed, birthDate)
	{
		public override void DisplayDetails()
		{
			Console.Write($"Dog breed: {Breed}, Birth date: {BirthDate:dd/MM/yyyy}");

			(int years, int months, int days) = Utils.ElapsedDate(BirthDate);

			Console.Write(" (age: ");
			if (years > 0) Console.Write($" {years} years");
			if (months > 0) Console.Write($" {months} months");
			if (days > 0) Console.Write($" {days} days");
			Console.WriteLine(")");
		}
	}
}