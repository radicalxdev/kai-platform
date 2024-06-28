import { Grid, Skeleton } from '@mui/material';

import styles from './styles';

/**
 * Returns a RewardCard component with an image and a chip displaying the amount of coins.
 *
 * @return {JSX.Element} The RewardCard component.
 */
const OutputHistoryCardSkeleton = () => {
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

export default OutputHistoryCardSkeleton;
