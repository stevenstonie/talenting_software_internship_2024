namespace code.p2.req1
{
	public class Shelter(string name, int capacity)
	{
		public string Name { get; set; } = name;
		public AnimalBase?[] AnimalSpots { get; set; } = new AnimalBase[capacity];

		private Boolean AddAnimal(AnimalBase animal)
		{
			for (int i = 0; i < AnimalSpots.Length; i++)
			{
				if (AnimalSpots[i] == null)
				{
					AnimalSpots[i] = animal;
					return true;
				}
			}

			Console.WriteLine("Shelter is full.");
			return false;
		}

		private Boolean AdoptAnimalFromSpot(int spot)
		{
			if (spot < 1 || spot > AnimalSpots.Length)
			{
				Console.WriteLine("Wrong spot number.");
				return false;
			}

			if (AnimalSpots[spot - 1] == null)
			{
				Console.WriteLine($"There is no pet at nb {spot}.");
				return false;
			}
			else
			{
				AnimalSpots[spot - 1] = null;
				Console.WriteLine($"The little one (at nb {spot}) has been adopted :)");
				return true;
			}
		}

		private void DisplayAnimals()
		{
			Console.WriteLine("Shelter: " + Name);

			List<int> freeSpots = [];

			for (int i = 0; i < AnimalSpots.Length; i++)
			{
				if (AnimalSpots[i] == null)
				{
					freeSpots.Add(i + 1);
				}
				else
				{
					Console.Write($"Spot {i + 1}: ");
					AnimalSpots[i]?.DisplayDetails();
				}
			}

			if (freeSpots.Count > 0)
			{
				Console.WriteLine("Free spots: " + string.Join(", ", freeSpots) + ".");
			}
			else
			{
				Console.WriteLine("No spots available.");
			}
		}

		private static AnimalBase GenerateRandomAnimal()
		{
			Random random = new();
			int animalType = random.Next(0, 2);
			int breedId = random.Next(1, 9);
			int year = random.Next(2010, 2024);
			int month = random.Next(1, 13);
			int day = random.Next(1, 29);

			if (animalType == 0)
			{
				return new Dog((DogBreed)breedId, new DateTime(year, month, day, 0, 0, 0, DateTimeKind.Utc));
			}
			else
			{
				return new Cat((CatBreed)breedId, new DateTime(year, month, day, 0, 0, 0, DateTimeKind.Utc));
			}
		}

		public void RunShelter()
		{
			int choice = 0;

			do
			{
				Console.WriteLine("-------------------------------------------------------------------------");
				Console.WriteLine("1 --> Show shelter spots.");
				Console.WriteLine("2 --> Add pet.");
				Console.WriteLine("3 --> Adopt pet.");
				Console.WriteLine("anything else --> go back");
				Console.WriteLine("-------------------------------------------------------------------------");
				choice = int.TryParse(Console.ReadLine(), out int result) ? result : 0;

				switch (choice)
				{
					case 1:
						{
							DisplayAnimals();
							break;
						}
					case 2:
						{
							AddAnimal(GenerateRandomAnimal());
							break;
						}
					case 3:
						{
							Console.Write("Choose a spot to adopt a pet: ");
							AdoptAnimalFromSpot(int.TryParse(Console.ReadLine(), out int spotChoice) ? spotChoice : 0);
							break;
						}
					default:
						break;
				}

			} while (choice >= 1 && choice <= 3);
		}
	}
}