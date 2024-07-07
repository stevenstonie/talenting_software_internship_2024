namespace code.p2.req2
{
	public class Flower(FlowerType type)
    {
        private FlowerType Type { get; } = type;
        public int Price { get; } = type switch
        {
            FlowerType.Rose => 10,
            FlowerType.Gladiola => 15,
            FlowerType.Hydrangea => 30,
            _ => 0
        };
    }
}