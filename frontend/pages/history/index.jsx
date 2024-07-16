import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MainAppLayout from '@/layouts/MainAppLayout';
import HistoryToolPage from '@/templates/HistoryToolPage';

import { listenToToolsHistory } from '@/redux/thunks/toolsHistory';

const KaiHistory = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.toolsHistory);

  useEffect(() => {
    let unsubscribe;
    dispatch(listenToToolsHistory()).then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  return <HistoryToolPage data={data} loading={loading} error={error} />;
};

KaiHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiHistory;
