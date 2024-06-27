import { useSelector } from 'react-redux';

import MainAppLayout from '@/layouts/MainAppLayout';
import HistoryToolPage from '@/templates/HistoryToolPage';

const KaiHistory = () => {
  const { data, loading, error } = useSelector((state) => state.toolsHistory);

  return <HistoryToolPage data={data} loading={loading} error={error} />;
};

KaiHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiHistory;
