import React, { useEffect } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';

import styles from './styles';

const SlidePanel = (props) => {
  const { isOpen, onClose, data } = props;

  useEffect(() => {
    // Effect to log mounting and data (removed)
  }, [isOpen, data]);

  const defaultData = {
    title: 'Default Title',
    content: 'Default Content',
    creationDate: new Date().toLocaleDateString(),
    questions: [
      {
        question: 'Default Question 1',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
      },
    ],
  };

  // Use the data prop or fall back to the default data
  const panelData = data?.response || defaultData.questions;

  // Function to copy content to clipboard with custom formatting
  const handleCopyToClipboard = () => {
    const label =
      data?.toolId === '0'
        ? 'Questions and Options'
        : 'Concepts and Definitions';
    const textToCopy = `
Title: ${data?.title || 'Default Title'}

Content: ${data?.content || 'Default Content'}

${label}:
${panelData
  .map((item, i) =>
    data?.toolId === '0'
      ? `${i + 1}. ${item.question}\n${item.choices
          ?.map((choice) => `   ${choice.key}. ${choice.value}`)
          .join('\n')}`
      : `${i + 1}. ${item.concept} - ${item.definition}`
  )
  .join('\n\n')}
`;

    navigator.clipboard.writeText(textToCopy);
  };

  // Function to export content to CSV without file-saver
  const handleExportToCSV = () => {
    const escapeCSVField = (field) => {
      if (typeof field === 'string') {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    let headers;
    let rows;

    if (data?.toolId === '0') {
      // MCQ
      headers = [
        'Question',
        'Option A',
        'Option B',
        'Option C',
        'Option D',
        'Correct Answer',
        'Explanation',
      ];
      rows = panelData.map((item) => [
        escapeCSVField(item.question),
        escapeCSVField(item.choices[0]?.value || ''),
        escapeCSVField(item.choices[1]?.value || ''),
        escapeCSVField(item.choices[2]?.value || ''),
        escapeCSVField(item.choices[3]?.value || ''),
        escapeCSVField(item.answer),
        escapeCSVField(item.explanation || ''),
      ]);
    } else {
      // Flash Cards
      headers = ['Concept', 'Definition'];
      rows = panelData.map((item) => [
        escapeCSVField(item.concept),
        escapeCSVField(item.definition),
      ]);
    }

    const csvContent = [
      headers.join(','),
      ...rows.map((e) => e.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data?.title.replace(/\s+/g, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const renderHeader = () => (
    <Grid container direction="column" {...styles.headerGridProps}>
      <Grid item>
        <Typography {...styles.dateProps}>
          {data?.creationDate || new Date().toLocaleDateString()}
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

  // Modified renderQuestions function to handle the provided MCQ data structure
  const renderQuestions = () =>
    panelData.map((item, index) => (
      <div key={index} style={{ marginBottom: '16px' }}>
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
        <Typography {...styles.answerProps} style={{ marginTop: '8px' }}>
          <strong>Correct Answer:</strong> {item.answer}
        </Typography>
        {item.explanation && (
          <Typography {...styles.explanationProps} style={{ marginTop: '4px' }}>
            <strong>Explanation:</strong> {item.explanation}
          </Typography>
        )}
      </div>
    )) || null;

  const renderFlashCards = () => (
    <Grid {...styles.flashCardsGridProps}>
      {panelData?.map((item, index) => (
        <Grid key={index} {...styles.flashCardGridProps}>
          <Typography {...styles.conceptTitleProps}>{item?.concept}</Typography>
          <Typography {...styles.definitionProps}>
            {item?.definition}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );

  const renderContent = () => (
    <Grid {...styles.containerGridProps}>
      {data?.toolId === '1' ? renderFlashCards() : renderQuestions()}
    </Grid>
  );

  const renderFooterButtons = () => (
    <Grid container justifyContent="flex-start" sx={{ mt: 3, width: '100%' }}>
      <Button onClick={handleCopyToClipboard} {...styles.copyButton}>
        <ContentCopyIcon {...styles.CopyIcon} />
        Copy
      </Button>
      <Button onClick={handleExportToCSV} {...styles.exportButton}>
        <FileDownloadIcon {...styles.downloadIcon} />
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

export default SlidePanel;
