namespace code
{
	public static class Utils
	{
        public static (int years, int months, int days) ElapsedDate(DateTime birthDate)
        {
            DateTime currentDate = DateTime.Today;

            int years = currentDate.Year - birthDate.Year;
            int months = currentDate.Month - birthDate.Month;
            int days = currentDate.Day - birthDate.Day;

            if (days < 0)
            {
                months--;
                days += DateTime.DaysInMonth(currentDate.Year, currentDate.Month == 1 ? 12 : currentDate.Month - 1);
            }

            if (months < 0)
            {
                years--;
                months += 12;
            }

            return (years, months, days);
        }
	}
}