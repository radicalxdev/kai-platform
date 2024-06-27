import React from 'react';

import { Grid, Typography } from '@mui/material';

import HistoryToolCard, { HistoryToolCardSkeleton } from '../HistoryToolCard';

import styles from './styles';

const DEFAULT_HISTORY = new Array(4)
  .fill()
  .map((_, index) => ({ id: index + 1 }));

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
          // Default values for backgroundImgURL and logo
          let backgroundImgURL =
            'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
          let logo =
            'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';

          let { title } = item;
          let multipleChoiceList;
          let flashCards;

          // Adjust values based on tool_id
          if (item.tool_data && item.tool_data.length > 0) {
            const toolId = item.tool_data[0].tool_id;

            if (toolId === '0') {
              const topicInput = item.tool_data[0].inputs.find(
                (input) => input.name === 'topic'
              );
              title = topicInput ? topicInput.value : 'Default Title';
              multipleChoiceList = item.messages?.data?.data;
            } else if (toolId === '1') {
              // If tool_id is "1", set title to inputs.value under tool_data
              const youtubeUrlInput = item.tool_data[0].inputs.find(
                (input) => input.name === 'youtube_url'
              );
              title = youtubeUrlInput ? youtubeUrlInput.value : 'Default Title';
              flashCards = item.messages?.data?.data;

              backgroundImgURL =
                'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
              logo =
                'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
            }
          }

          return (
            <HistoryToolCard
              key={index}
              title={title}
              description={item.description}
              createdDate={item.createdDate}
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
        {DEFAULT_HISTORY?.map((historyTool) => (
          <HistoryToolCardSkeleton key={historyTool.id} />
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
