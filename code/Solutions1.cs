
using System.Text;

namespace code
{
	static class Solutions1
	{
		// 1. a). Write a method that calculates the sum of two numbers given as parameters.
		static int CalculateSum(int a, int b)
		{
			return a + b;
		}

		// 1. b). Calculate the sum of the numbers without using the operator "+".
		static int CalculateSumWithoutOperator(int a, int b)
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
		static int CalculateSum(int[] numbers)
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
		static Boolean IsTextHoloalphabetic(string text)
		{
			bool[] alphabetLetters = new bool[26];

			for (int i = 0; i < text.Length; i++)
			{
				char letter = char.ToLower(text[i]);

				if (letter >= 'a' && letter <= 'z')
				{
					alphabetLetters[letter - 'a'] = true;
				}
			}

			for (int i = 0; i < alphabetLetters.Length; i++)
			{
				if (!alphabetLetters[i])
				{
					return false;
				}
			}

			return true;
		}

		// 3. Write a method that swaps the value of two variables but doesnt use a third variable
		static void Swap(ref int a, ref int b)
		{
			a += b;
			b = a - b;
			a -= b;
		}

		// 4. Write a method that displays the number of appearances of each character in a non-null string.
		// It should be displayed in the following format:
		// Input: aaanna issss attt ssschhoooool
		// Output: a3n2a1 i1s4 a1t3 s3c1h2o5l1
		static void PrintCharacterCount(string text)
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
		static void PlayLotoRound()
		{
			int[] generatedNumbers = new int[6], insertedNumbers = new int[6];


			GenerateNumbersAndInsertNumbers(ref generatedNumbers, ref insertedNumbers);

			if (CheckIfWinner(generatedNumbers, insertedNumbers))
			{
				Console.WriteLine("You won!");
			}
			else
			{
				Console.WriteLine("You lost!");
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
		static void PrintPupils(string[] names)
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

		// 7. We have the following words: student, profesor, curs, numar, locuri, nume, cnp, prenume, denumire, curs, nota, durata, persoana.
		// Create a structure of classes that contains methods, fields, etc, in which you can explain oop concepts (abstraction, encapsulation, inheritance and polymorphism).
		// Add any other fields and methods that you need to fulfill these requirements.


		static void openMenu()
		{
			int choice = 0;
			do
			{
				Console.WriteLine("-------------------------------------------------------------------------");
				Console.WriteLine("1 --> sum of numbers given as parameters.");
				Console.WriteLine("2 --> holoalphabetic sentence.");
				Console.WriteLine("3 --> swap two variables without an additional third one.");
				Console.WriteLine("4 --> display the number of appearances of each character in order.");
				Console.WriteLine("5 --> play a loto round.");
				Console.WriteLine("6 --> display different types of lists from a list of pupils.");
				Console.WriteLine("7 --> oop tutorial");
				Console.WriteLine("anything else --> Exit");
				Console.WriteLine("-------------------------------------------------------------------------");
				choice = int.TryParse(Console.ReadLine(), out int result) ? result : 0;

				switch (choice)
				{
					case 1:
						{
							Console.WriteLine("Sum of 1, 2, 3 and 4 is: " + CalculateSum([1, 2, 3, 4]));
							break;
						}
					case 2:
						{
							string text = "defghijklmnOpPqrstuvwxyzABCCCC";
							Console.WriteLine(IsTextHoloalphabetic(text) ? text + " is holoalphabetic." : text + "is not holoalphabetic.");
							break;
						}
					case 3:
						{
							int a = 5, b = 10;
							Console.WriteLine("Before swap: a: " + a + " b: " + b);

							Swap(ref a, ref b);

							Console.WriteLine("After swap: a: " + a + " b: " + b);
							break;
						}
					case 4:
						{
							string text = " aaanna issss attt ssschhoooool.    ";
							Console.WriteLine("Input: " + text);

							Console.Write("Output: ");
							PrintCharacterCount(text);
							break;
						}
					case 5:
						{
							PlayLotoRound();
							break;
						}
					case 6:
						{
							PrintPupils(["Diana", "Alina", "Andrei", "Marius", "Lavinia", "David", "George", "Laurentiu", "Larisa", "Edi", "Mihai", "Sergiu", "Georgiana", "Alina"]);
							break;
						}
					case 7:
						{
							Course maths = new("Mathematics", 30);
							Course machineLearning = new("Machine Learning", 12);
							Course oop = new("Object Oriented Programming", 20);
							Course dataStruct = new("Data Structures", 15);

							Teacher teacher1 = new("Marin", "Shau", "123456789");
							Teacher teacher2 = new("Marcel", "Barabula", "12345678");

							Student student1 = new("Joe", "Don", "1234567");
							Student student2 = new("Daniel", "Guta", "123456");
							Student student3 = new("Maria", "Dobrin", "12345");

							List<Person> people = [teacher1, teacher2, student1, student2, student3];

							teacher1.AddCourse(maths);
							teacher1.AddCourse(machineLearning);
							teacher1.AddCourse(oop);
							teacher2.AddCourse(dataStruct);

							student1.EnrollInCourse(maths);
							student1.EnrollInCourse(machineLearning);
							student2.EnrollInCourse(maths);
							student2.EnrollInCourse(machineLearning);
							student2.EnrollInCourse(dataStruct);
							student3.EnrollInCourse(oop);
							student3.EnrollInCourse(dataStruct);

							student1.AddGrade(maths, 10);
							student2.AddGrade(maths, 7);
							student2.AddGrade(dataStruct, 9);
							student3.AddGrade(oop, 8);
							student3.AddGrade(dataStruct, 6);

							foreach (Person person in people)
							{
								person.DisplayDetails();
								Console.WriteLine();
							}
							break;
						}

					default:
						break;
				}
			} while (choice >= 1 && choice <= 7);
		}

		static void Main(string[] args)
		{
			openMenu();
		}
	}


}