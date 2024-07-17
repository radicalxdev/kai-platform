import { Button, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import ToolImage from '@/assets/images/BookImage.png';

import styles from './styles';

/**
 * Renders a card component displaying information about a tool session.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - A description of the tool used and how it was used.
 * @param {string} props.content - A description or content related to the tool output.
 * @param {string} props.creationDate - The creation date of the tool session.
 * @param {string} props.backgroundImageUrl - URL of the background image for the card.
 * @param {string} props.logo - URL of the logo image for the tool.
 * @param {function} props.onOpen - Callback function to handle opening the detailed view.
 *
 * @returns {JSX.Element} A React component that renders the tool history card.
 */
const ToolHistoryCard = (props) => {
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

export default ToolHistoryCard;
