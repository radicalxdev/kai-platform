import { getRandomBackgroundColor } from '@/utils/MiscellaneousUtils';

const styles = {
  mainGridProps: {
    container: true,
    item: true,
    desktopLarge: 6,
    laptop: 4,
  },
  historyCardProps: {
    container: true,
    item: true,
    display: 'flex',
    desktopLarge: 12,
    gap: 1.5,
    height: '122px',
    borderRadius: '15px',
    sx: {
      overflow: 'hidden',
      transition: (theme) => theme.transitions.create('all'),
      boxShadow:
        '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.05)',
      },
    },
  },

  toolDetailsGridProps: {
    desktopLarge: 8,
    elevation: 5,
    position: 'relative',
    container: true,
    item: true,
    mobileSmall: 12,
    rowGap: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardProps: (backgroundImgURL) => ({
    desktopLarge: 4,
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      width: '30%',
      borderRadius: '10px 0 0 10px',
      p: 2,
      ...(backgroundImgURL && {
        backgroundImage: `url(${backgroundImgURL})`,
        backgroundSize: 'cover',
      }),
      ...(!backgroundImgURL && {
        background: getRandomBackgroundColor(),
      }),
    },
  }),
  contentGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: 'column',
  },
  dateProps: {
    display: 'flex',
    fontFamily: 'Satoshi Regular',
    fontSize: '10px',
    fontWeight: 400,
    borderRadius: 58,
    border: 'none',
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDCD1',
    color: '#FF0505',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    fontWeight: 700,
    color: (theme) => theme.palette.Common.Black['100p'],
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14px',
    fontWeight: 400,
    color: (theme) => theme.palette.Common.Black['100p'],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  imageProps: {
    layout: 'fill',
    objectFit: 'fill',
  },
  imageGridProps: {
    position: 'relative',
    container: true,
    item: true,
    width: 58,
    height: 58,
    borderRadius: '50%',
  },
  previewButtonProps: {
    sx: {
      width: 52,
      borderRadius: 53,
      fontSize: '10px',
      color: (theme) => theme.palette.Common.White['100p'],
      background: '#4900E4',
      textTransform: 'capitalize',
      height: 26,
      mt: 1.5,
      '&:hover': {
        background: '#4900E4',
        color: (theme) => theme.palette.Common.White['50p'],
      },
    },
  },
};

export default styles;
