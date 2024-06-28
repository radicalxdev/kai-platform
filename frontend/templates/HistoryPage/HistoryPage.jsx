import React from 'react';

import { Grid } from '@mui/material';

import HistoryListingContainer from '@/components/HistoryListingContainer';

import styles from './styles';

const HistoryPage = (props) => {
  const { data, loading } = props;

  return (
    <Grid {...styles.mainGridProps}>
      <HistoryListingContainer data={data} loading={loading} />
    </Grid>
  );
};

export default HistoryPage;
