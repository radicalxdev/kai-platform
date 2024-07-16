import { useEffect, useState } from 'react';

import moment from 'moment';

const findIndexToInsert = (array, item, createdAt) => {
  for (let i = 0; i < array.length; i += 1) {
    if (moment(array[i].createdAt).isBefore(createdAt)) {
      return i;
    }
  }
  return array.length;
};

const useFilterByTime = (data) => {
  const [categorizedData, setCategorizedData] = useState({
    today: [],
    yesterday: [],
    previous7Days: [],
    previous30Days: [],
    monthsBefore: {},
  });

  const [isHistoryEmpty, setIsHistoryEmpty] = useState(true);

  useEffect(() => {
    if (data) {
      const today = [];
      const yesterday = [];
      const previous7Days = [];
      const previous30Days = [];
      const monthsBefore = {};

      const now = moment();
      const startOfToday = now.clone().startOf('day');
      const startOfYesterday = now.clone().subtract(1, 'days').startOf('day');
      const startOfPrevious7Days = now
        .clone()
        .subtract(7, 'days')
        .startOf('day');
      const startOfPrevious30Days = now
        .clone()
        .subtract(30, 'days')
        .startOf('day');
      const startOfThisMonth = now.clone().startOf('month');

      data.forEach((item) => {
        const createdAt = item.createdAt && moment.unix(item.createdAt.seconds); // Correctly access seconds
        if (!createdAt) return;

        if (createdAt.isSame(startOfToday, 'day')) {
          today.push(item);
        } else if (createdAt.isSame(startOfYesterday, 'day')) {
          yesterday.push(item);
        } else if (
          createdAt.isBetween(startOfPrevious7Days, startOfToday, 'day', '[]')
        ) {
          previous7Days.push(item);
        } else if (
          createdAt.isBetween(
            startOfPrevious30Days,
            startOfPrevious7Days,
            'day',
            '[]'
          )
        ) {
          previous30Days.push(item);
        } else if (createdAt.isBefore(startOfThisMonth, 'day')) {
          const monthKey = createdAt.format('MMMM YYYY');
          if (!monthsBefore[monthKey]) {
            monthsBefore[monthKey] = [];
          }
          const index = findIndexToInsert(
            monthsBefore[monthKey],
            item,
            createdAt
          );
          monthsBefore[monthKey].splice(index, 0, item);
        }
      });

      const sortedMonthsBefore = Object.keys(monthsBefore).sort((a, b) => {
        return (
          moment(b, 'MMMM YYYY').valueOf() - moment(a, 'MMMM YYYY').valueOf()
        );
      });

      const sortedMonthsBeforeData = {};
      sortedMonthsBefore.forEach((monthKey) => {
        sortedMonthsBeforeData[monthKey] = monthsBefore[monthKey];
      });

      setCategorizedData({
        today,
        yesterday,
        previous7Days,
        previous30Days,
        monthsBefore: sortedMonthsBeforeData,
      });

      const historyEmpty =
        today.length === 0 &&
        yesterday.length === 0 &&
        previous7Days.length === 0 &&
        previous30Days.length === 0 &&
        Object.values(monthsBefore).every((timeData) => timeData.length === 0);
      setIsHistoryEmpty(historyEmpty);
    }
  }, [data]);

  return { ...categorizedData, isHistoryEmpty };
};

export default useFilterByTime;
