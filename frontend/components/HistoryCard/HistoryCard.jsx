import { Button, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import ToolImage from '@/assets/images/BookImage.png'; // Default image

import styles from './styles';

const HistoryCard = (props) => {
  const { title, content, creationDate, backgroundImageUrl, logo, onOpen } =
    props;

  const handleButtonClick = () => {
    onOpen(); // Call onOpen without passing additional props
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps(backgroundImageUrl)}>
        <Image src={logo || ToolImage} alt="tool logo" {...styles.imageProps} />
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.dateProps}>{creationDate}</Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{content}</Typography>
        <Button {...styles.previewButtonProps} onClick={handleButtonClick}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.cardProps} elevation={6}>
        <Grid {...styles.toolDetailsGridProps}>
          {renderImage()}
          {renderTitle()}
        </Grid>
      </Card>
    </Grid>
  );
};

export default HistoryCard;
