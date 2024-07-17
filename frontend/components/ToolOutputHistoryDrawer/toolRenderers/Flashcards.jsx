import { Grid, Typography } from '@mui/material';

import styles from '../styles';

const renderFlashcards = ({ data }) => {
  const panelData = data?.response || [];

  return (
    <Grid container {...styles.flashCardsGridProps}>
      {panelData?.map((item, index) => (
        <Grid key={index} {...styles.flashCardGridProps}>
          <Typography {...styles.conceptTitleProps}>{item?.concept}</Typography>
          <Typography {...styles.definitionProps}>
            {item?.definition}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default renderFlashcards;
