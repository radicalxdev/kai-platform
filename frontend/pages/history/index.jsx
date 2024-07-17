import useToolHistoryProps from '@/hooks/useToolHistoryProps';

import MainAppLayout from '@/layouts/MainAppLayout';
import ToolHistoryPage from '@/templates/ToolHistoryPage';

const ToolOutputHistory = () => {
  const { categorizedData, loading, error } = useToolHistoryProps();

  return (
    <ToolHistoryPage data={categorizedData} loading={loading} error={error} />
  );
};

ToolOutputHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ToolOutputHistory;
