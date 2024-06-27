import { useState } from 'react';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Alert, Button, Grid, Snackbar } from '@mui/material';

import styles from './styles';

const HistoryToolButtons = (props) => {
  const { createdDate, title, description, multipleChoiceList, flashCards } =
    props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopy = () => {
    let content = `Created Date: ${createdDate}\n`;
    content += `Title: ${title}\n`;
    content += `Description: ${description}\n\n`;

    // Append Multiple Choice Questions and Answers
    if (multipleChoiceList && multipleChoiceList.length > 0) {
      content += 'Questions and Options:\n';
      multipleChoiceList.forEach((item, index) => {
        content += `${index + 1}. ${item.question}\n`;
        item.choices.forEach((choice, qIndex) => {
          content += `   ${String.fromCharCode(65 + qIndex)}. ${
            choice.value
          }\n`;
        });
        content += '\n';
        content += `Answer ${index + 1}: ${String.fromCharCode(
          65 + item.answer.charCodeAt(0) - 'A'.charCodeAt(0)
        )}\n`;
        content += `Explanation: ${item.explanation}\n\n`;
      });
    }

    // Append Flash Cards
    if (flashCards && flashCards.length > 0) {
      content += 'Flash Cards:\n';
      flashCards.forEach((card, index) => {
        content += `${index + 1}. ${card.concept}\n`;
        content += `   - ${card.definition}\n\n`;
      });
    }

    navigator.clipboard.writeText(content).then(
      () => {
        setSnackbarMessage('Content copied to clipboard!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      },
      () => {
        setSnackbarMessage('Failed to copy content.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    );
  };

  const handleExport = () => {
    let csvContent = '"Created Date","Title","Description"\n';
    csvContent += `"${createdDate}","${title}","${description}"\n\n`;

    // Export Multiple Choice List
    if (multipleChoiceList && multipleChoiceList.length > 0) {
      multipleChoiceList.forEach((item, index) => {
        csvContent += `"Question ${index + 1}","${item.question}","\n`;

        item.choices.forEach((choice, choiceIndex) => {
          csvContent += `"","Option ${String.fromCharCode(
            65 + choiceIndex
          )}","${choice.value}"\n`;
        });

        csvContent += '"\n';

        csvContent += `"Answer ${index + 1}","${String.fromCharCode(
          65 + item.answer.charCodeAt(0) - 'A'.charCodeAt(0)
        )}","${item.explanation}"\n\n`;
      });
    }

    // Export Flash Cards
    if (flashCards && flashCards.length > 0) {
      csvContent += '\n\n"Concept","Definition"\n';
      flashCards.forEach((card) => {
        csvContent += `"${card.concept}","${card.definition}"\n`;
      });
    }

    const fileName = `${title
      .replace(/ /g, '_')
      .toLowerCase()}_${createdDate}.csv`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Grid {...styles.mainGridButtonProps}>
        <Button {...styles.buttonProps} onClick={handleCopy}>
          <ContentCopyOutlinedIcon {...styles.buttonIconProps} />
          Copy
        </Button>
        <Button {...styles.buttonProps} onClick={handleExport}>
          <FileDownloadOutlinedIcon {...styles.buttonIconProps} />
          Export
        </Button>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '20%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HistoryToolButtons;
