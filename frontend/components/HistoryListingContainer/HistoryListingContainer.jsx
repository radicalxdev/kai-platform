import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import OutputHistoryCard from '../HistoryCard';
import SlidePanel from '../SlidePanel/SlidePanel';

import styles from './styles';

import { transformToolData } from '@/services/history/transformToolData';

const HistoryListingContainer = ({ data, loading }) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);

  useEffect(() => {
    // Removed console logs
  }, [data, loading]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!data) return <Typography>No data available</Typography>;

  const handleOpenSidebar = (cardData) => {
    setSelectedCardData(cardData);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidePanelOpen(false);
  };

  const renderSection = ({ text, size }) => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.categoryTitleProps}>
        {text} ({size})
      </Typography>
    </Grid>
  );

  const renderCards = ({ category }) => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {data?.[category].map((item) => {
          const transformedData = transformToolData(
            item.topic,
            item.response,
            item.createdAt,
            item.tool_id
          );

          // Pass only relevant props to OutputHistoryCard
          const { title, content, backgroundImageUrl, logo, creationDate } =
            transformedData;

          return (
            <OutputHistoryCard
              key={item.id}
              title={title}
              content={content}
              backgroundImageUrl={backgroundImageUrl}
              logo={logo}
              creationDate={creationDate}
              onOpen={() => handleOpenSidebar(transformedData)} // Pass full transformed data to SlidePanel
            />
          );
        })}
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    const hasWeek = data?.Week?.length > 0;
    const hasMonth = data?.Month?.length > 0;
    const hasYear = data?.Year?.length > 0;
    const hasOlder = data?.Older?.length > 0;

    return (
      <>
        {hasWeek && (
          <>
            {renderSection({
              text: 'This Week',
              size: data?.Week?.length,
            })}
            {renderCards({ category: 'Week' })}
          </>
        )}
        {hasMonth && (
          <>
            {renderSection({
              text: 'This Month',
              size: data?.Month?.length,
            })}
            {renderCards({ category: 'Month' })}
          </>
        )}
        {hasYear && (
          <>
            {renderSection({
              text: 'This Year',
              size: data?.Year?.length,
            })}
            {renderCards({ category: 'Year' })}
          </>
        )}
        {hasOlder && (
          <>
            {renderSection({
              text: 'Older',
              size: data?.Older?.length,
            })}
            {renderCards({ category: 'Older' })}
          </>
        )}
        {!hasWeek && !hasMonth && !hasYear && !hasOlder && (
          <Grid {...styles.headerGridProps}>
            <Typography {...styles.categoryTitleProps}>
              History is currently empty. Start using our services to track your
              activities and view your history here.
            </Typography>
          </Grid>
        )}
      </>
    );
  };

  return (
    <>
      <Grid {...styles.mainGridProps}>
        <Typography {...styles.titleProps}>History</Typography>
        {renderContent()}
      </Grid>
      <SlidePanel
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidebar}
        data={selectedCardData}
      />
    </>
  );
};

export default HistoryListingContainer;
