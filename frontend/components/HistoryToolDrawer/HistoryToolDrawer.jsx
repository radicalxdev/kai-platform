import React from 'react';

import { Drawer, Grid, List, ListItem, Typography } from '@mui/material';

import HistoryToolButtons from './HistoryToolDrawerButtons';
import styles from './styles';

/**
 * Renders the HistoryDrawer component.
 *
 * @param {object} props - The properties of the component.
 * @param {boolean} props.open - Whether the drawer is open.
 * @param {function} props.toggleDrawer - The function to toggle the drawer.
 * @param {string} props.createdDate - The date the tool was created.
 * @param {string} props.title - The title of the tool.
 * @param {string} props.description - The description of the tool.
 * @param {object[]} props.multipleChoiceList - Array of multiple choice items.
 * @param {object[]} props.flashCards - Array of flash card items.
 * @returns {JSX.Element} The HistoryDrawer component.
 */
const HistoryToolDrawer = (props) => {
  const {
    open,
    toggleDrawer,
    createdDate,
    title,
    description,
    multipleChoiceList,
    flashCards,
  } = props;
  const renderDrawerHeader = () => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.dateProps}>{createdDate}</Typography>
      <Typography {...styles.titleProps}>{title}</Typography>
      <Typography {...styles.descriptionProps}>{description}</Typography>
      <Typography {...styles.underlineProps} />
    </Grid>
  );

  const renderMultipleChoiceList = () => (
    <Grid {...styles.listGridProps}>
      {multipleChoiceList.map((item, index) => (
        <div key={index}>
          <Typography {...styles.listTitleProps}>{`${index + 1}. ${
            item.question
          }`}</Typography>
          <List>
            {item.choices.map((choice, choiceIndex) => (
              <Grid key={choiceIndex} {...styles.listItemGridProps}>
                <ListItem>
                  <Typography {...styles.listItemProps}>{`${String.fromCharCode(
                    65 + choiceIndex
                  )}. ${choice.value}`}</Typography>
                </ListItem>
              </Grid>
            ))}
          </List>
        </div>
      ))}
      {/* Render answer keys and explanations after all questions */}
      {multipleChoiceList.length > 0 && (
        <Grid {...styles.answerKeyGridProps}>
          <Typography {...styles.answerKeyTitleProps}>Answer Keys:</Typography>
          <List>
            {multipleChoiceList.map((item, index) => (
              <React.Fragment key={index}>
                <Grid>
                  <ListItem>
                    <Typography {...styles.answerKeyValueProps}>{`${
                      index + 1
                    }. Answer: ${String.fromCharCode(
                      65 + item.answer.charCodeAt(0) - 'A'.charCodeAt(0)
                    )}`}</Typography>
                  </ListItem>
                </Grid>
                <Grid>
                  <ListItem>
                    <Typography
                      {...styles.answerKeyExplanationProps}
                    >{`Explanation: ${item.explanation}`}</Typography>
                  </ListItem>
                </Grid>
              </React.Fragment>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );

  const renderFlashCards = () => (
    <Grid {...styles.flashCardGridProps}>
      {flashCards.map((card, index) => (
        <Grid key={index} {...styles.flashCardBorderProps}>
          <Typography {...styles.flashCardConceptProps}>
            {card.concept}
          </Typography>
          <Typography {...styles.flashCardDefinitionProps}>
            {card.definition}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        {...styles.drawerGridProps}
      >
        {renderDrawerHeader()}
        {multipleChoiceList && renderMultipleChoiceList()}
        {flashCards && renderFlashCards()}
        <HistoryToolButtons
          createdDate={createdDate}
          title={title}
          description={description}
          multipleChoiceList={multipleChoiceList}
          flashCards={flashCards}
        />
      </Drawer>
    </Grid>
  );
};

export default HistoryToolDrawer;
