const styles = {
  drawerProps: {
    sx: {
      '& .MuiDrawer-paper': {
        width: '45%', // Adjust this value to control the width of the drawer
        background: (theme) => theme.palette.common.white,
      },
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      rowGap: 3,
    },
    anchor: 'right',
  },
  mainGridProps: {
    container: true,
    item: true,
    mobileSmall: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 3,
    padding: 3,
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '36px',
    color: 'black', // Set color to black for visibility
  },
  categoryTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '24px',
    color: 'black', // Set color to black for visibility
    mt: '10px', // Add margin-top to space it from the date
  },
  categoryContentProps: {
    fontFamily: 'Satoshi',
    fontSize: '18px',
    color: 'black', // Set color to black for visibility
    mt: '5px', // Add margin-top to space it from the title
  },
  questionProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '20px',
    color: 'black', // Set color to black for visibility
  },
  optionProps: {
    fontFamily: 'Satoshi',
    fontSize: '20px',
    color: 'black', // Set color to black for visibility
  },
  answerProps: {
    fontFamily: 'Satoshi',
    fontSize: '18px',
    color: 'black', // Set color to black for visibility
  },
  explanationProps: {
    fontFamily: 'Satoshi',
    fontSize: '18px',
    color: 'black', // Set color to black for visibility
  },
  flashCardsGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 3,
  },
  flashCardGridProps: {
    container: true,
    item: true,
    gap: 2,
    mobileSmall: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    px: 6,
    py: 10,
    sx: {
      background: (theme) => theme.palette.common.white,
      borderRadius: '10px',
      border: (theme) => `2px solid ${theme.palette.grey[400]}`,
    },
  },
  conceptTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '18px', desktop: '20px' },
    color: 'black', // Set color to black for visibility
  },
  definitionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '18px', desktop: '20px' },
    textAlign: 'center',
    color: 'black', // Set color to black for visibility
  },
  containerGridProps: {
    item: true,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerGridProps: {
    container: true,
    item: true,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', // Align items to the start (left)
    flexDirection: 'column',
    pb: 1.5,
    sx: {
      borderBottom: (theme) => `2px solid ${theme.palette.grey[400]}`,
    },
  },
  dateProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '14px', // Increase the font size
    backgroundColor: '#E0DFFB', // Light purple background
    borderRadius: '12px', // Make it more rounded
    color: '#4900E4', // Purple text color
    padding: '5px 10px', // Add padding to increase the size
    textTransform: 'none',
    marginBottom: '10px', // Add margin to position the date properly
    display: 'inline-block', // To ensure the background fits snugly
    marginTop: '5px',
    alignSelf: 'flex-start', // Align to the left
    fontWeight: 'bold', // Make the text bold
  },
  copyButton: {
    sx: {
      backgroundColor: '#EAE5F3',
      color: '#742696',
      borderRadius: '30px',
      marginRight: '8px',
      marginLeft: '8px',
      width: '120px',
    },
  },
  exportButton: {
    sx: {
      backgroundColor: '#EAE5F3',
      color: '#742696',
      borderRadius: '30px',
      marginLeft: '8px',
      marginRight: '8px',
      width: '120px',
    },
  },
  CopyIcon: {
    sx: {
      marginRight: '8px',
    },
  },
  downloadIcon: {
    sx: {
      marginRight: '8px',
    },
  },
};

export default styles;
