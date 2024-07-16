import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import useFilterByTime from '@/hooks/useFilterByTime';

import HistoryListingContainer from '@/components/HistoryToolListingContainer';

import ROUTES from '@/constants/routes';

import styles from './styles';

const HistoryToolPage = (props) => {
  const { data, loading } = props;
  const {
    today,
    yesterday,
    previous7Days,
    previous30Days,
    monthsBefore,
    isHistoryEmpty,
  } = useFilterByTime(data);

  const renderTitle = () => (
    <Grid {...styles.titleGridProps}>
      <Typography {...styles.titleProps}>Tool History</Typography>
    </Grid>
  );

  const renderHistoryToolContainer = (category, timeData) => {
    if (timeData.length === 0) return null;

    return (
      <HistoryListingContainer
        key={category}
        data={timeData}
        loading={loading}
        category={category}
      />
    );
  };

  const renderHistorySections = () => (
    <>
      {renderHistoryToolContainer('Today', today)}
      {renderHistoryToolContainer('Yesterday', yesterday)}
      {renderHistoryToolContainer('Previous 7 days', previous7Days)}
      {renderHistoryToolContainer('Previous 30 days', previous30Days)}
      {Object.entries(monthsBefore).map(([month, timeData]) =>
        renderHistoryToolContainer(month, timeData)
      )}
    </>
  );

  const renderEmptyMessage = () => (
    <Grid {...styles.emptyMessageGridProps}>
      <Typography {...styles.emptyMessageProps}>
        Looks like you haven&apos;t explored history yet. Time to make some!
      </Typography>
      <Typography {...styles.emptyMessageLinkProps}>
        <Link href={ROUTES.HOME} passHref>
          Explore Tools
        </Link>
      </Typography>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {isHistoryEmpty ? renderEmptyMessage() : renderHistorySections()}
    </Grid>
  );
};

export default HistoryToolPage;
