import { Grid, Typography } from '@mui/material';

import ToolHistoryListingContainer from '@/components/ToolHistoryListingContainer';

import styles from './styles';

const ToolHistoryPage = (props) => {
  const { data, loading, error } = props;

  if (error) {
    return (
      <Grid {...styles.errorContainer}>
        <Typography {...styles.errorTitle}>
          Error: Could not fetch history data.
        </Typography>
        <Typography {...styles.errorMessage}>
          Please try again later.
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid {...styles.mainGridProps}>
      <ToolHistoryListingContainer data={data} loading={loading} />
    </Grid>
  );
};

export default ToolHistoryPage;
