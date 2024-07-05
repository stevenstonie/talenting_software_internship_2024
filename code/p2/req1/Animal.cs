namespace code.p2.req1
{
	public abstract class Animal<TBreed>(TBreed breed, DateTime birthDate) : AnimalBase
	{
		public TBreed Breed { get; set; } = breed;

		public DateTime BirthDate { get; set; } = birthDate;
	}
}