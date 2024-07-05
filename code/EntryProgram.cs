using code.p1;
using code.p1.req7;
using code.p2;

namespace code
{
	static class EntryProgram
	{
		static void OpenMenu()
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
							Console.WriteLine("Sum of 1, 2, 3 and 4 is: " + Req1To6.CalculateSum([1, 2, 3, 4]));
							break;
						}
					case 2:
						{
							string text = "defghijklmnOpPqrstuvwxyzABCCCC";
							Console.WriteLine(Req1To6.IsTextHoloalphabetic(text) ? text + " is holoalphabetic." : text + "is not holoalphabetic.");
							break;
						}
					case 3:
						{
							int a = 5, b = 10;
							Console.WriteLine("Before swap: a: " + a + " b: " + b);

							Req1To6.Swap(ref a, ref b);

							Console.WriteLine("After swap: a: " + a + " b: " + b);
							break;
						}
					case 4:
						{
							string text = " aaanna issss attt ssschhoooool.    ";
							Console.WriteLine("Input: " + text);

							Console.Write("Output: ");
							Req1To6.PrintCharacterCount(text);
							break;
						}
					case 5:
						{
							Req1To6.PlayLotoRound();
							break;
						}
					case 6:
						{
							Req1To6.PrintPupils(["Diana", "Alina", "Andrei", "Marius", "Lavinia", "David", "George", "Laurentiu", "Larisa", "Edi", "Mihai", "Sergiu", "Georgiana", "Alina"]);
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

			Console.Write("Exiting program");
			Thread.Sleep(700);
			Console.Write(".");
			Thread.Sleep(700);
			Console.Write(".");
			Thread.Sleep(700);
			Console.Write(".");
			Thread.Sleep(700);
			Console.WriteLine();
		}

		static void Main(string[] args)
		{
			OpenMenu();
		}
	}


}