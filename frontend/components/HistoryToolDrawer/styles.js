const styles = {
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    sx: {
      padding: '10px 40px',
    },
  },
  drawerGridProps: {
    width: '698px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    sx: {
      '& .MuiDrawer-paper': {
        background: '#fff',
        width: '698px',
        p: '20px 40px',
        overflowY: 'auto', // Ensure vertical scrollbar appears when content exceeds height
        '&::-webkit-scrollbar': {
          width: '12px', // Adjust scrollbar width here
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
        scrollbarWidth: 'thin', // For Firefox
      },
    },
  },
  headerGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    gap: 0.5,
    sx: {
      color: 'black',
    },
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '24px',
    fontWeight: 700,
  },
  dateProps: {
    display: 'flex',
    fontFamily: 'Satoshi Regular',
    fontSize: '12px',
    fontWeight: 700,
    borderRadius: 58,
    border: 'none',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    color: '#4900E4',
  },
  descriptionProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '18px',
    fontWeight: 700,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#B8B8B8',
  },
  underlineProps: {
    borderBottom: '2px solid #B8B8B8',
    width: '100%',
    my: '10px',
  },
  listGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  listProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '18px',
    fontWeight: 700,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  listTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    fontWeight: 700,
    color: 'black',
  },
  listItemGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  listItemProps: {
    sx: {
      color: 'black',
      fontFamily: 'Satoshi Regular',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '20px',
      textTransform: 'capitalize',
    },
  },
  answerKeyGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  answerKeyTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '18px',
    fontWeight: 700,
    color: 'black',
  },
  answerKeyValueProps: {
    sx: {
      color: 'black',
      fontFamily: 'Satoshi Regular',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '14px',
      textTransform: 'capitalize',
    },
  },
  answerKeyExplanationProps: {
    sx: {
      lineHeight: '27px',
      color: '#000000',
    },
  },
  flashCardGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    my: 4,
  },
  flashCardBorderProps: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '40px', // Increase padding to make the flash card taller
    marginBottom: '24px', // Increase margin bottom for spacing between cards
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
    // Include padding and border in width calculation
  },
  flashCardConceptProps: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Satoshi Regular',
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '10px',
  },
  flashCardDefinitionProps: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 400,
    marginTop: '5px',
  },
  // For HistoryDrawerButtons
  mainGridButtonProps: {
    container: true,
    item: true,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 1.5,
    py: 1.5,
  },
  buttonProps: {
    sx: {
      display: 'flex',
      gap: 1,
      backgroundColor: '#F3F0FF',
      borderRadius: '100px',
      color: '#4900E4',
      fontFamily: 'Satoshi Bold',
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'none',
      width: '116px',
      '&:hover': {
        backgroundColor: '#F3F0FF',
        color: '#4900E4',
      },
    },
  },
  buttonIconProps: {
    sx: {
      color: '#4900E4',
      fontSize: '20px',
    },
  },
};

export default styles;
