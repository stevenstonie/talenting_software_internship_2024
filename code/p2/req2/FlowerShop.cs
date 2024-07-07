namespace code.p2.req2
{
	public class FlowerShop(string name)
	{
		private string Name { get; } = name;
		private List<(Bouquet, (int, byte))> BouquetsSold { get; } = [];
		private List<(Flower, (int, byte))> FlowersSold { get; } = [];

		private void SellBouquet(BouquetType type, (int, byte) dateOfSelling)
		{
			Bouquet bouquetToSell = new(type);
			BouquetsSold.Add((bouquetToSell, dateOfSelling));
		}

		private void SellFlower(FlowerType type, (int, byte) dateOfSelling)
		{
			Flower flowerToSell = new(type);
			FlowersSold.Add((flowerToSell, dateOfSelling));
		}

		private void DisplaySalesInfoByMonth((int, byte) dateOfSelling)
		{
			List<(Bouquet, (int, byte))> bouquetsSoldInMonth = BouquetsSold
					.Where(bouquetSold => bouquetSold.Item2.Item1 == dateOfSelling.Item1
							&& bouquetSold.Item2.Item2 == dateOfSelling.Item2).ToList();

			List<(Flower, (int, byte))> flowersSoldInMonth = FlowersSold
					.Where(flowerSold => flowerSold.Item2.Item1 == dateOfSelling.Item1
							&& flowerSold.Item2.Item2 == dateOfSelling.Item2).ToList();

			Console.WriteLine($"Sold in {dateOfSelling.Item1}/{dateOfSelling.Item2}:");
			Console.WriteLine($"{bouquetsSoldInMonth.Count} bouquets for a total of {bouquetsSoldInMonth.Sum(bouquet => bouquet.Item1.Price)} RON.");
			Console.WriteLine("and");
			Console.WriteLine($"{flowersSoldInMonth.Count} individual flowers for a total of {flowersSoldInMonth.Sum(flower => flower.Item1.Price)} RON.");
		}

		private static (int?, byte?) GetDateFromUser()
		{
			Console.Write("Choose a date (in format yyyy/mm/dd): ");
			string? date = Console.ReadLine();

			if (date != null && date.Length >= 7)
			{
				int? year = int.TryParse(date.AsSpan(0, 4), out int result) ? result : null;
				byte? month = byte.TryParse(date.AsSpan(5, 2), out byte result2) ? result2 : null;

				if (year is not null && month is not null && year > 0 && year < 9999 && month >= 1 && month <= 12)
					return (year.Value, month.Value);
			}

			return (null, null);
		}

		public void RunShop()
		{
			Console.WriteLine($"Welcome to Flower Shop {Name}!");

			int choice;
			do
			{
				Console.WriteLine("-------------------------------------------------------------------------");
				Console.WriteLine("1 --> Sell Bouquet");
				Console.WriteLine("2 --> Sell Flower");
				Console.WriteLine("3 --> Display Inventory");
				Console.WriteLine("anything else --> go back");
				Console.WriteLine("-------------------------------------------------------------------------");
				choice = int.TryParse(Console.ReadLine(), out int result) ? result : 0;

				switch (choice)
				{
					case 1:
						{
							Console.Write("Choose bouquet type (1 = big, 2 = medium, 3 = small): ");
							BouquetType typeToSell = (BouquetType)(int.TryParse(Console.ReadLine(), out result) ? result : 0);

							(int?, byte?) date = GetDateFromUser();

							if (date is not (null, null) &&
										(typeToSell is BouquetType.Big
										|| typeToSell is BouquetType.Medium
										|| typeToSell is BouquetType.Small))
								SellBouquet(typeToSell, (date.Item1 ?? 0, date.Item2 ?? 0));
						}
						break;
					case 2:
						{
							Console.Write("Choose flower type (1 = rose, 2 = gladiola, 3 = hydrangea): ");
							FlowerType typeToSell = (FlowerType)(int.TryParse(Console.ReadLine(), out result) ? result : 0);

							(int?, byte?) date = GetDateFromUser();

							if (date is not (null, null) &&
										(typeToSell is FlowerType.Rose
										|| typeToSell is FlowerType.Gladiola
										|| typeToSell is FlowerType.Hydrangea))
								SellFlower(typeToSell, (date.Item1 ?? 0, date.Item2 ?? 0));

							break;
						}
					case 3:
						{
							(int?, byte?) date = GetDateFromUser();

							if (date is not (null, null))
								DisplaySalesInfoByMonth((date.Item1 ?? 0, date.Item2 ?? 0));

							break;
						}
					default:
						break;
				}
			} while (choice >= 1 && choice <= 3);
		}
	}
}
