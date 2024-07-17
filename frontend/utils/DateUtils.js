import moment from 'moment';

const categorizeDate = (creationDate, currentDate) => {
  // Remove time part from dates for comparison using moment
  const todayDateOnly = moment(currentDate).startOf('day');
  const creationDateOnly = moment(creationDate).startOf('day');

  // Get start and end of the week (assuming week starts on Monday)
  const startOfWeek = todayDateOnly.clone().startOf('isoWeek');
  const endOfWeek = todayDateOnly.clone().endOf('isoWeek');

  // Get start and end of the month
  const startOfMonth = todayDateOnly.clone().startOf('month');
  const endOfMonth = todayDateOnly.clone().endOf('month');

  // Get start and end of the year
  const startOfYear = todayDateOnly.clone().startOf('year');
  const endOfYear = todayDateOnly.clone().endOf('year');

  // Categorize the creation date
  if (creationDateOnly.isBetween(startOfWeek, endOfWeek, null, '[]')) {
    return 'Week';
  }
  if (creationDateOnly.isBetween(startOfMonth, endOfMonth, null, '[]')) {
    return 'Month';
  }
  if (creationDateOnly.isBetween(startOfYear, endOfYear, null, '[]')) {
    return 'Year';
  }
  return 'Older';
};

export const categorizeDataByDate = (data) => {
  if (!data) return null;
  const newHistoryOutput = {
    Week: [],
    Month: [],
    Year: [],
    Older: [],
  };

  const currentDate = moment();

  data.forEach((item) => {
    const category = categorizeDate(
      moment(item.createdAt.toDate()),
      currentDate
    );
    newHistoryOutput[category].push(item);
  });

  return newHistoryOutput;
};
