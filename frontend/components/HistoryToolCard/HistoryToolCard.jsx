import { useState } from 'react';

import { Button, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import HistoryToolDrawer from '../HistoryToolDrawer';

import styles from './styles';

import { truncateString } from '@/utils/MiscellaneousUtils';

/**
 * HistoryToolCard component renders a card with tool information and a preview button
 * that opens a drawer with detailed information.
 *
 * @component
 * @param {Object} props - React props
 * @param {string} props.backgroundImgURL - The URL of the background image
 * @param {string} props.title - The title of the tool
 * @param {string} props.logo - The URL of the logo image
 * @param {string} props.description - The description of the tool
 * @param {string} props.createdDate - The creation date of the tool
 * @param {Array} props.multipleChoiceList - List of multiple choice questions
 * @param {Array} props.flashCards - List of flash cards
 * @returns {JSX.Element} The rendered component
 */

const HistoryToolCard = (props) => {
  const {
    backgroundImgURL,
    title,
    logo,
    description,
    createdDate,
    multipleChoiceList,
    flashCards,
  } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderImage = () => (
    <Grid {...styles.imageGridProps}>
      <Image src={logo} alt="Logo" {...styles.imageProps} />
    </Grid>
  );

  const renderDetails = () => (
    <Grid {...styles.contentGridProps}>
      <Typography {...styles.dateProps}>{createdDate}</Typography>
      <Typography {...styles.titleProps}>
        {title && truncateString(title, 30)}
      </Typography>
      <Typography {...styles.descriptionProps}>
        {description && truncateString(description, 50)}
      </Typography>

      <Button {...styles.previewButtonProps} onClick={toggleDrawer}>
        Preview
      </Button>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.historyCardProps}>
        <Card {...styles.cardProps(backgroundImgURL)}>{renderImage()}</Card>
        <Grid {...styles.toolDetailsGridProps}>{renderDetails()}</Grid>
      </Grid>
      <HistoryToolDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        createdDate={createdDate}
        title={title}
        description={description}
        multipleChoiceList={multipleChoiceList}
        flashCards={flashCards}
      />
    </Grid>
  );
};

export default HistoryToolCard;
