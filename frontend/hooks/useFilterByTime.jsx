import { useEffect, useState } from 'react';

import moment from 'moment';

const useFilterByTime = (data) => {
  const [categorizedData, setCategorizedData] = useState({
    today: [],
    yesterday: [],
    previous7Days: [],
    previous30Days: [],
    monthsBefore: {},
  });

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
        // Convert Firestore timestamp to Moment.js object
        const createdAt =
          item.createdAt && moment.unix(item.createdAt._seconds); // eslint-disable-line no-underscore-dangle

        if (!createdAt) return;

        const formattedDate = createdAt.format('MM/DD/YYYY');
        const newItem = { ...item, createdDate: formattedDate };

        if (createdAt.isSame(startOfToday, 'day')) {
          today.push(newItem);
        } else if (createdAt.isSame(startOfYesterday, 'day')) {
          yesterday.push(newItem);
        } else if (
          createdAt.isBetween(startOfPrevious7Days, startOfToday, 'day', '[]')
        ) {
          previous7Days.push(newItem);
        } else if (
          createdAt.isBetween(
            startOfPrevious30Days,
            startOfPrevious7Days,
            'day',
            '[]'
          )
        ) {
          previous30Days.push(newItem);
        } else if (createdAt.isBefore(startOfThisMonth, 'day')) {
          const monthKey = createdAt.format('MMMM YYYY');
          if (!monthsBefore[monthKey]) {
            monthsBefore[monthKey] = [];
          }
          monthsBefore[monthKey].push(newItem);
        }
      });

      setCategorizedData({
        today,
        yesterday,
        previous7Days,
        previous30Days,
        monthsBefore,
      });
    }
  }, [data]);

  return categorizedData;
};

export default useFilterByTime;
