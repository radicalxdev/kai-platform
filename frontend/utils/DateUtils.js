function categorizeDate(creationDate, currentDate) {
  // Remove time part from dates for comparison
  const todayDateOnly = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const creationDateOnly = new Date(
    creationDate.getFullYear(),
    creationDate.getMonth(),
    creationDate.getDate()
  );

  // Get start of the week (assuming week starts on Monday)
  const dayOfWeek = todayDateOnly.getDay();
  const startOfWeek = new Date(todayDateOnly);
  startOfWeek.setDate(
    todayDateOnly.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
  );
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Get start and end of the month
  const startOfMonth = new Date(
    todayDateOnly.getFullYear(),
    todayDateOnly.getMonth(),
    1
  );
  const endOfMonth = new Date(
    todayDateOnly.getFullYear(),
    todayDateOnly.getMonth() + 1,
    0
  );

  // Get start and end of the year
  const startOfYear = new Date(todayDateOnly.getFullYear(), 0, 1);
  const endOfYear = new Date(todayDateOnly.getFullYear(), 11, 31);

  // Categorize the creation date
  if (creationDateOnly >= startOfWeek && creationDateOnly <= endOfWeek) {
    return 'Week';
  }
  if (creationDateOnly >= startOfMonth && creationDateOnly <= endOfMonth) {
    return 'Month';
  }
  if (creationDateOnly >= startOfYear && creationDateOnly <= endOfYear) {
    return 'Year';
  }
  return 'Older';
}

export function categorizeDataByDate(data) {
  const newHistoryOutput = {
    Week: [],
    Month: [],
    Year: [],
    Older: [],
  };

  data.forEach((item) => {
    const category = categorizeDate(item.createdAt.toDate(), new Date());
    newHistoryOutput[category].push(item);
  });

  return newHistoryOutput;
}
