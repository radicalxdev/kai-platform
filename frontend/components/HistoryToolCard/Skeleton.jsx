import { Grid, Skeleton } from '@mui/material';

import styles from './styles';

/**
 * Returns a skeleton for the HistoryCard component.
 *
 * @return {JSX.Element} The HistoryCard Skeleton component.
 */
const HistoryToolCardSkeleton = () => {
  return (
    <Grid {...styles.mainGridProps}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={150}
        width="100%"
        sx={{
          borderRadius: '10px',
          bgcolor: (theme) => theme.palette.Common.Black['30p'],
        }}
      />
    </Grid>
  );
};

export default HistoryToolCardSkeleton;
