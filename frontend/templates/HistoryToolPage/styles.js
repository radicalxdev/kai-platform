const styles = {
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 5,
    px: { laptop: 4, desktop: 5, desktopMedium: 6 },
    py: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
  },
  titleGridProps: {
    container: true,
    item: true,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '36px',
  },
  emptyMessageGridProps: {
    container: true,
    item: true,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: 1,
  },
  emptyMessageProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '24px',
    textAlign: 'center',
    color: (theme) => theme.palette.Greyscale[600],
  },
  emptyMessageButtonProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '28px',
    textAlign: 'center',
  },
  emptyMessageLinkProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '24px',
    textAlign: 'center',
    textTransform: 'none',
    color: (theme) => theme.palette.Greyscale[600],
    sx: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
};

export default styles;
