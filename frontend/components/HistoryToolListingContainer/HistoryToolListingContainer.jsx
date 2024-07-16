import { Grid, Typography } from '@mui/material';
import moment from 'moment';

import HistoryToolCard, { HistoryToolCardSkeleton } from '../HistoryToolCard';

import styles from './styles';

import { getToolCardData } from '@/utils/ToolUtils';

const DEFAULT_HISTORY = new Array(4)
  .fill()
  .map((_, index) => ({ id: index + 1 }));

/**
 * Renders the HistoryToolListingContainer component, which displays a list of tool cards or skeleton loaders based on loading state.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.data - The array of tool data to display.
 * @param {boolean} props.loading - The loading state indicating whether data is being fetched.
 * @param {string} props.category - The category name to display as the title.
 * @returns {JSX.Element} The rendered HistoryToolListingContainer component.
 */
const HistoryToolListingContainer = (props) => {
  const { data, loading, category } = props;

  const renderTitle = () => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.categoryTitleProps}>
        {category} {data && `(${data?.length})`}
      </Typography>
    </Grid>
  );

  const renderCards = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {data.map((item, index) => {
          const {
            title,
            backgroundImgURL,
            logo,
            multipleChoiceList,
            flashCards,
          } = getToolCardData(item);

          return (
            <HistoryToolCard
              key={index}
              title={title}
              description={item.description}
              createdDate={moment
                .unix(item.createdAt.seconds)
                .format('MM/DD/YYYY')}
              backgroundImgURL={backgroundImgURL}
              logo={logo}
              multipleChoiceList={multipleChoiceList}
              flashCards={flashCards}
            />
          );
        })}
      </Grid>
    </Grid>
  );

  const renderLoader = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {DEFAULT_HISTORY.map((tool) => (
          <HistoryToolCardSkeleton key={tool.id} />
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {loading ? renderLoader() : renderCards()}
    </Grid>
  );
};

export default HistoryToolListingContainer;
