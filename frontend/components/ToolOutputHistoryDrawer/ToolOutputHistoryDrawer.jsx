import { ContentCopy, FileDownload } from '@mui/icons-material';
import { Button, Drawer, Grid, Typography } from '@mui/material';
import moment from 'moment';

import { TOOLS } from '@/constants/tools';

import styles from './styles';

import renderFlashcards from './toolRenderers/Flashcards';

import renderMultipleChoiceQuiz from './toolRenderers/MultipleChoiceQuiz';

import { copyToClipboard, exportToCSV } from '@/utils/ToolHistoryUtils';

const DRAWER_RENDERERS = {
  [TOOLS.MCQ]: renderMultipleChoiceQuiz,
  [TOOLS.FLASHCARDS]: renderFlashcards,
};

const DEFAULT_DATA = {
  title: 'Default Title',
  content: 'Default Content',
  creationDate: moment().toDate().toLocaleDateString(),
  questions: [
    {
      question: 'Default Question 1',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
    },
  ],
};

const ToolOutputHistoryDrawer = (props) => {
  const { isOpen, onClose, data } = props;
  if (!data) {
    return null;
  }

  const panelData = data?.response || DEFAULT_DATA.questions;

  const handleCopyToClipboard = () => {
    copyToClipboard(data, panelData);
  };

  const handleExportToCSV = () => {
    exportToCSV(data, panelData);
  };

  const renderHeader = () => (
    <Grid container direction="column" {...styles.headerGridProps}>
      <Grid item>
        <Typography {...styles.dateProps}>
          {data?.creationDate || moment().toDate().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryTitleProps}>
          {data?.title || 'Default Title'}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryContentProps}>
          {data?.content || 'Default Content'}
        </Typography>
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    const ToolRenderer = DRAWER_RENDERERS[data.toolId];

    return (
      <Grid {...styles.containerGridProps}>
        <ToolRenderer data={data} />
      </Grid>
    );
  };

  const renderFooterButtons = () => (
    <Grid container justifyContent="flex-start" sx={{ mt: 3, width: '100%' }}>
      <Button onClick={handleCopyToClipboard} {...styles.copyButton}>
        <ContentCopy {...styles.CopyIcon} />
        Copy
      </Button>
      <Button onClick={handleExportToCSV} {...styles.exportButton}>
        <FileDownload {...styles.downloadIcon} />
        Export
      </Button>
    </Grid>
  );

  return (
    <Drawer {...styles.drawerProps} open={isOpen} onClose={onClose}>
      <Grid {...styles.mainGridProps}>
        {renderHeader()}
        {renderContent()}
        {renderFooterButtons()}
      </Grid>
    </Drawer>
  );
};

export default ToolOutputHistoryDrawer;
