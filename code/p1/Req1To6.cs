using System.Text;

namespace code.p1
{
	public static class Req1To6
	{
		// 1. a). Write a method that calculates the sum of two numbers given as parameters.
		public static int CalculateSum(int a, int b)
		{
			return a + b;
		}

		// 1. b). Calculate the sum of the numbers without using the operator "+".
		public static int CalculateSumWithoutOperator(int a, int b)
		{
			while (b != 0)
			{
				int carry = a & b;
				a ^= b;
				b = carry << 1;
			}

			return a;
		}

		// 1. c). Apply the concept of overloading for this method (calculateSum)
		// 1. d). Add the posibility to calculate the sum of 3, 4, 5, etc. numbers. (variable number of parameters)
		public static int CalculateSum(int[] numbers)
		{
			int sum = 0;

			foreach (int number in numbers)
			{
				sum += number;
			}

			return sum;
		}

		// 2. Find out if a sequence of characters given as input data represents a holoalphabetic sentence (a panagram = a text that uses
		// all the letters of the alphabet, in this case the english alphabet).
		public static Boolean IsTextHoloalphabetic(string text)
		{
			bool[] alphabetLetters = new bool[26];
			byte count = 0;

			for (int i = 0; i < text.Length; i++)
			{
				char letter = char.ToLower(text[i]);

				if (letter >= 'a' && letter <= 'z' && !alphabetLetters[letter - 'a'])
				{
					alphabetLetters[letter - 'a'] = true;
					++count;
				}

				if (count == 26)
				{
					return true;
				}
			}

			return false;
		}

		// 3. Write a method that swaps the value of two variables but doesnt use a third variable
		public static void Swap(ref int a, ref int b)
		{
			a += b;
			b = a - b;
			a -= b;
		}

		// 4. Write a method that displays the number of appearances of each character in a non-null string.
		// It should be displayed in the following format:
		// Input: aaanna issss attt ssschhoooool
		// Output: a3n2a1 i1s4 a1t3 s3c1h2o5l1
		public static void PrintCharacterCount(string text)
		{
			string result = "";
			char lastLetter = text[0];
			int counter = char.IsLetter(text[0]) ? 1 : 0;
			StringBuilder sb = new();

			for (int i = 1; i < text.Length; i++)
			{
				if (!char.IsLetter(text[i]))
				{
					_ = counter > 0 ? sb.Append(text[i - 1]).Append(counter) : sb.Append(text[i - 1]);
					counter = 0;
					continue;
				}
				if (text[i] == lastLetter)
				{
					++counter;
				}
				else
				{
					_ = counter > 0 ? sb.Append(text[i - 1]).Append(counter) : sb.Append(text[i - 1]);
					lastLetter = text[i];
					counter = 1;
				}
			}
			_ = counter > 0 ? sb.Append(text[text.Length - 1]).Append(counter) : sb.Append(text[text.Length - 1]);

			result = sb.ToString();

			Console.WriteLine(result);
		}

		// 5. Starting from the idea of loto 6/49, create a program that simulates a round. The participant inserts 6 numbers (between 
		// 1 and 49), and the program responds whether it is a winner or not. The game is won if the inserted numbers are
		// the same as the generated ones. Keep in mind that the order doesnt have to be the same.
		public static void PlayLotoRound()
		{
			int[] generatedNumbers = new int[6], insertedNumbers = new int[6];


			GenerateNumbersAndInsertNumbers(ref generatedNumbers, ref insertedNumbers);

			if (CheckIfWinner(generatedNumbers, insertedNumbers))
			{
				Console.WriteLine("Winner!🤑🤑🤑🎰🎰💸💸");
			}
			else
			{
				Console.WriteLine("Better luck next time😪");
			}

			Console.WriteLine("Generated numbers: " + string.Join(", ", generatedNumbers));
			Console.WriteLine("Inserted numbers: " + string.Join(", ", insertedNumbers));
		}

		private static bool CheckIfWinner(int[] generatedNumbers, int[] insertedNumbers)
		{
			foreach (int number in insertedNumbers)
			{
				if (!generatedNumbers.Contains(number))
				{
					return false;
				}
			}

			return true;
		}

		private static void GenerateNumbersAndInsertNumbers(ref int[] generatedNumbers, ref int[] insertedNumbers)
		{
			generatedNumbers[0] = new Random().Next(1, 50);
			for (int i = 1; i < generatedNumbers.Length; i++)
			{
				do
				{
					generatedNumbers[i] = new Random().Next(1, 50);
				} while (generatedNumbers.Take(i).Contains(generatedNumbers[i]));
			}

			do
			{
				Console.Write("Insert an unique number 1 (from 1 to 49): ");
				insertedNumbers[0] = int.TryParse(Console.ReadLine(), out int result) ? result : 0;
			} while (insertedNumbers[0] < 1 || insertedNumbers[0] > 49);
			for (int i = 1; i < insertedNumbers.Length; i++)
			{
				do
				{
					Console.Write("Insert an unique number " + (i + 1) + " (from 1 to 49): ");
					insertedNumbers[i] = int.TryParse(Console.ReadLine(), out int result) ? result : 0;
				} while (insertedNumbers.Take(i).Contains(insertedNumbers[i]) || insertedNumbers[i] < 1 || insertedNumbers[i] > 49);
			}
		}

		// 6. Starting from a list of pupil names, display: a). alphabetically all the names that contain at least one letter 'a',
		// b). all names that have at least 5 letters, c). the shortest name, d). the longest name, e). the number of times the name Alina appears
		public static void PrintPupils(string[] names)
		{
			string[] ascendingNamesWithA = [.. names.Where(name => name.ToLower().Contains('a')).OrderBy(name => name)];
			string[] namesWith5Letters = [.. names.Where(name => name.Length >= 5)];
			string shortestName = names.OrderBy(name => name.Length).First();
			string longestName = names.OrderByDescending(name => name.Length).First();
			int alinaCount = names.Count(name => name.ToLower() == "alina");

			Console.WriteLine("a) " + string.Join(", ", ascendingNamesWithA));
			Console.WriteLine("b) " + string.Join(", ", namesWith5Letters));
			Console.WriteLine("c) " + shortestName);
			Console.WriteLine("d) " + longestName);
			Console.WriteLine("e) " + alinaCount);
		}

	}
}