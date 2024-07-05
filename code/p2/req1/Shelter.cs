namespace code.p2.req1
{
	public class Shelter(string name, int capacity)
	{
		public string Name { get; set; } = name;
		public AnimalBase?[] AnimalSpots { get; set; } = new AnimalBase[capacity];

		public Boolean AddAnimal(AnimalBase animal)
		{
			for (int i = 0; i < AnimalSpots.Length; i++)
			{
				if (AnimalSpots[i] == null)
				{
					AnimalSpots[i] = animal;
					return true;
				}
			}

			return false;
		}

		public Boolean AdoptAnimalFromSpot(int spot)
		{
			if (spot < 1 || spot > AnimalSpots.Length) return false;

			if (AnimalSpots[spot - 1] == null)
			{
				Console.WriteLine("Spot is empty..");
				return false;
			}
			else
			{
				AnimalSpots[spot - 1] = null;
				Console.WriteLine("The little one has been adopted :)");
				return true;
			}
		}

		public void DisplayAnimals()
		{
			Console.WriteLine("Shelter: " + Name);
			for (int i = 0; i < AnimalSpots.Length; i++)
			{
				Console.Write($"Spot {i + 1}: ");
				AnimalSpots[i]?.DisplayDetails();
			}
		}
	}
}