namespace code.p2.req2
{

	public class Bouquet
	{
		public BouquetType Type { get; }
		public List<Flower> Flowers { get; }
		public int Price { get; }

		public Bouquet(BouquetType type) {
			Type = type;
			Flowers = AddFlowersToBouquet(type);
			Price = Flowers.Sum(flower => flower.Price) + 2;
		}

		private static List<Flower> AddFlowersToBouquet(BouquetType type)
		{
			List<Flower> flowers = [];

			switch (type)
			{
				case BouquetType.Big:
					{
						flowers.AddRange(AddFlowersOfOneType(FlowerType.Rose, 9));
						flowers.AddRange(AddFlowersOfOneType(FlowerType.Gladiola, 10));
						flowers.AddRange(AddFlowersOfOneType(FlowerType.Hydrangea, 3));
						break;
					}
				case BouquetType.Medium:
					{
						flowers.AddRange(AddFlowersOfOneType(FlowerType.Rose, 6));
						flowers.AddRange(AddFlowersOfOneType(FlowerType.Gladiola, 5));
						break;
					}
				case BouquetType.Small:
					{
						flowers.AddRange(AddFlowersOfOneType(FlowerType.Rose, 5));
						break;
					}
			}

			return flowers;
		}

		private static List<Flower> AddFlowersOfOneType(FlowerType type, int quantity)
		{
			List<Flower> flowers = [];

			for (int i = 0; i < quantity; i++)
			{
				flowers.Add(new Flower(type));
			}

			return flowers;
		}
	}
}