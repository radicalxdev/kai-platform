import { useState } from 'react';

import {
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  FileDownloadOutlined as FileDownloadOutlinedIcon,
} from '@mui/icons-material';
import { Alert, Button, Grid, Snackbar } from '@mui/material';

import styles from './styles';

import {
  copyContentToClipboard,
  exportContentAsCSV,
} from '@/utils/MiscellaneousUtils';

/**
 * Component for copy and export buttons with snackbar notifications.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.createdDate - Content creation date
 * @param {string} props.title - Content title
 * @param {string} props.description - Content description
 * @param {Array} props.multipleChoiceList - List of multiple choice questions and answers
 * @param {Array} props.flashCards - List of flashcards with concepts and definitions
 * @returns {JSX.Element} HistoryToolButtons component
 */
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
    copyContentToClipboard({
      createdDate,
      title,
      description,
      multipleChoiceList,
      flashCards,
    })
      .then(() => {
        setSnackbarMessage('Content copied to clipboard!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage('Failed to copy content.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleExport = () => {
    exportContentAsCSV({
      createdDate,
      title,
      description,
      multipleChoiceList,
      flashCards,
    });
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
