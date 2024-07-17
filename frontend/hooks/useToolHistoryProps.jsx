import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '@/redux/store';
import { fetchToolHistory } from '@/redux/thunks/toolHistory';
import { categorizeDataByDate } from '@/utils/DateUtils';

const useToolHistoryProps = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.toolHistory);

  useEffect(() => {
    // Dispatch the thunk to fetch output history data
    if (!data) dispatch(fetchToolHistory({ firestore }));
  }, [dispatch, data]);

  // Categorize the data after it is fetched
  const categorizedData = categorizeDataByDate(data);

  return {
    categorizedData,
    loading,
    error,
  };
};

export default useToolHistoryProps;
