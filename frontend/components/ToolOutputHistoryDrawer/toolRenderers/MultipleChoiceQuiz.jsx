import { Grid, List, ListItem, Typography } from '@mui/material';

import styles from '../styles';

const renderMultipleChoiceQuiz = ({ data }) => {
  const panelData = data?.response || [];

  return (
    <Grid container direction="column">
      {panelData.map((item, index) => (
        <Grid key={index} sx={{ marginBottom: '16px' }}>
          <Typography {...styles.questionProps}>
            {index + 1}. {item?.question}
          </Typography>
          <List>
            {item?.choices?.map((choice, choiceIndex) => (
              <ListItem key={choiceIndex} sx={{ py: 0 }}>
                <Typography {...styles.optionProps}>
                  {choice.key}. {choice.value}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Typography {...styles.answerProps} sx={{ marginTop: '8px' }}>
            <strong>Correct Answer:</strong> {item.answer}
          </Typography>
          {item.explanation && (
            <Typography {...styles.explanationProps} sx={{ marginTop: '4px' }}>
              <strong>Explanation:</strong> {item.explanation}
            </Typography>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default renderMultipleChoiceQuiz;
