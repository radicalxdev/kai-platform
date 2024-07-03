import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ToolHistoryCard, { ToolCardSkeleton } from '../ToolHistoryCard';
import ToolOutputHistoryDrawer from '../ToolOutputHistoryDrawer/ToolOutputHistoryDrawer';

import styles from './styles';

import { transformToolData } from '@/services/history/transformToolData';

const LOADER_HISTS = new Array(4).fill().map((_, index) => ({ id: index + 1 }));

/**
 * Renders the Tool History Listing Container component.
 *
 * @param {object} props - The props object.
 * @param {Array} props.data - The data to be displayed in the container.
 * @param {boolean} props.loading - The loading state.
 * @returns {JSX.Element} The rendered Tool History Listing Container component.
 */
const ToolHistoryListingContainer = ({ data, loading }) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);

  const renderLoader = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {LOADER_HISTS.map((tool) => (
          <ToolCardSkeleton key={tool.id} />
        ))}
      </Grid>
    </Grid>
  );

  if (loading) return renderLoader();

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
          const transformedData = transformToolData(item);

          const { title, content, backgroundImageUrl, logo, creationDate } =
            transformedData;

          return (
            <ToolHistoryCard
              key={item.id}
              title={title}
              content={content}
              backgroundImageUrl={backgroundImageUrl}
              logo={logo}
              creationDate={creationDate}
              onOpen={() => handleOpenSidebar(transformedData)}
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
      <ToolOutputHistoryDrawer
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidebar}
        data={selectedCardData}
      />
    </>
  );
};

export default ToolHistoryListingContainer;