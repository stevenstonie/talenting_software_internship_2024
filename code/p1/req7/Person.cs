namespace code.p1
{
	// 7. We have the following words: student, profesor, curs, numar, locuri, nume, cnp, prenume, denumire, curs, nota, durata, persoana.
	// Create a structure of classes that contains methods, fields, etc, in which you can explain oop concepts (abstraction, encapsulation, inheritance and polymorphism).
	// Add any other fields and methods that you need to fulfill these requirements.
	public abstract class Person(string firstName, string lastName, string personalNumericCode)
	{
		public string FirstName { get; set; } = firstName;

		public string LastName { get; set; } = lastName;

		public string PersonalNumericCode { get; set; } = personalNumericCode;

		public abstract void DisplayDetails();
	}
}