const historyButtonAlign = 10;

const styles = {
  mainGridProps: (showChatHistory) => ({
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mobileSmall: 12,
    height: '100%',
    overflow: 'hidden',
    marginRight: showChatHistory ? 41 : 7,
    sx: {
      form: {
        width: '100%',
        height: '100%',
      },
      transition: 'all 0.5s',
    },
  }),
  moreChat: {
    moreChatProps: {
      container: true,
      bgcolor: '#FCFCFC',
      boxShadow: '0px 4px 15px rgba(202, 202, 202, 0.25)',
      borderRadius: '12px',
      flexDirection: 'column',
      alignContent: 'center',
      padding: '10px 10px',
      zIndex: 100,
    },
    contentMoreChatProps: {
      container: true,
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '15px 20px',
      borderRadius: '14px',
      sx: {
        ':hover': {
          backgroundColor: '#f0f0f0',
        },
      },
    },
    titleProps: {
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '14px',
      color: '#717171',
      sx: {
        marginLeft: '10px',
        marginRight: '30px',
      },
    },
    iconProps: {
      fontSize: '1.5rem !important',
      color: '#717171 !important',
    },
  },
  topChat: {
    topChatGridProps: {
      container: true,
      item: true,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      px: { mobileSmall: 2, desktopMedium: 3, desktopLarge: 4 },
      py: 1,
      height: '56px',
    },
    leftTopChatGridProps: {
      container: true,
      item: true,
      mobileSmall: 12,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    backToFriendProps: {
      color: '#6B6B6B',
    },
    avatarGridProps: {
      container: true,
      mobileSmall: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      item: true,
      padding: '2px',
      sx: {
        background: (theme) =>
          `linear-gradient(45deg, transparent, ${theme.palette.Background.green})`,
        borderRadius: '50%',
      },
    },
    outlinedButtonProps: {
      color: 'grey1',
      inverted: true,
      extraProps: {
        padding: '2px',
        height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
      },
      extraButtonProps: {
        fontFamily: 'Satoshi Medium',
        fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
        px: { laptop: 3, desktop: 4, desktopMedium: 5 },
      },
    },
  },
  profileChat: {
    profileChatGridProps: {
      container: true,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '16px',
      marginLeft: '10px',
      color: (theme) => theme.palette.Background.green,
    },
  },
  backFromSettings: {
    backFromSettingsGridProps: {
      container: true,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter',
      cursor: 'pointer',
    },
    titleProps: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#6B6B6B',
      marginLeft: '10px',
    },
  },
  centerChat: {
    centerChatGridProps: {
      position: 'relative',
      container: true,
      mobileSmall: true,
      flexDirection: 'column',
      justifyContent: 'center',
      zIndex: 0,
      px: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
      sx: {
        overflowY: 'auto',
      },
    },
    noMessagesGridProps: {
      container: true,
      desktopLarge: 12,
      justifyContent: 'center',
      height: '100%',
      alignContent: 'flex-start',
    },
    messagesGridProps: {
      container: true,
      item: true,
      mobileSmall: 12,
      px: '3px',
      pb: '3px',
      mt: 0.5,
      height: '100%',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      sx: {
        overflowY: 'auto',
      },
    },
    imageProps: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
    },
    titleProps: {
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '23px',
      lineHeight: '45px',
      letterSpacing: '0.02em',
      color: '#646464',
      sx: {
        marginTop: '10px',
      },
    },
  },
  bottomChatContent: {
    bottomChatContentGridProps: {
      container: true,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
      px: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
    },
    bottomBarChatProps: {
      container: true,
      height: '100%',
      mobileSmall: 12,
      justifycontent: 'space-between',
      alignItems: 'center',
    },
    chatInputGridProps: (error) => ({
      position: 'relative',
      container: true,
      mobileSmall: 12,
      justifyContent: 'center',
      alignItems: 'center',
      height: '54px',
      padding: '2px',
      sx: {
        fieldSet: {
          display: 'none',
        },
        background: (theme) =>
          error ? theme.palette.error.main : theme.palette.Background.grey1,
        borderRadius: '50px',
      },
    }),
    chatInputProps: (renderSendIcon, error, input) => ({
      type: 'text',
      placeholder: !error && 'Send a message',
      autoComplete: 'off',
      sx: { width: '100%', height: '100%' },
      InputProps: {
        notched: false,
        sx: (theme) => ({
          bgcolor: '#D9D9D9',
          borderRadius: '50px',
          color: input ? '#333333' : theme.palette.Greyscale[499],
          pl: { laptop: '6px', desktop: '10px' },
          pr: { laptop: '8px', desktop: '10px' },
          height: '100%',
          fontFamily: 'Satoshi Medium',
          fontSize: { laptop: '16px', desktop: '18px', desktopMedium: '20px' },
          whiteSpace: 'pre-wrap',
          lineHeight: '35px',
        }),
        endAdornment: renderSendIcon(),
      },
      FormHelperTextProps: {
        sx: {
          position: 'absolute',
          transform: 'translate(55px, 30%)',
          fontFamily: 'Satoshi Medium',
          fontSize: { mobileSmall: '16px', desktopMedium: '20px' },
          lineHeight: '35px',
        },
      },
    }),
    sendIconProps: {
      style: {
        fill: (theme) => theme.palette.Dark_Colors.Dark[3],
        cursor: 'pointer !important',
      },
    },
    iconButtonProps: (disabled) => ({
      edge: 'end',
      'aria-label': 'toggle password visibility',
      sx: {
        width: { mobileSmall: 36, desktopMedium: 42 },
        height: { mobileSmall: 36, desktopMedium: 42 },
        mr: '2px',
        path: {
          fill: (theme) =>
            disabled
              ? `${theme.palette.Greyscale[700]} !important`
              : `${theme.palette.Background.green} !important`,
        },
        ':hover': {
          background: (theme) =>
            disabled
              ? 'none !important'
              : `${theme.palette.Common.Black['30p']} !important`,
        },
      },
    }),
  },
  chatbotSpinnerGridProps: (show) => ({
    position: 'absolute',
    display: show ? 'flex' : 'none',
    height: '100%',
    columnGap: 2,
    width: 'fit-content',
    justifyContent: 'flex-start',
    alignItems: 'center',
    px: '15px',
    sx: {
      borderRadius: '14px',
    },
  }),
  chatIconGridProps: {
    item: true,
    mobileSmall: 'auto',
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTextGridProps: (error) => ({
    item: true,
    mobileSmall: 'auto',
    sx: {
      background: error
        ? (theme) => theme.palette.Background.gradient.error
        : 'linear-gradient(85deg, #2845DC 0%, #BB43E6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  }),
  loadingTextProps: {
    fontFamily: 'Satoshi Medium',
    fontSize: '14px',
  },
  loadingSpinnerGridProps: {
    item: true,
    mobileSmall: 'auto',
  },
  cancelIconProps: {
    sx: { width: '34px', height: '34px' },
  },
  avatarProps: {
    priority: true,
    width: 48,
    height: 48,
    style: { display: 'flex', borderRadius: '50%' },
    objectFit: 'fill',
  },
  avatarIconInputProps: {
    sx: {
      position: 'relative',
      marginRight: 2,
      height: 48,
      width: 48,
      maxHeight: 'none',
    },
  },
  newMessageButtonProps: {
    sx: (theme) => ({
      position: 'absolute',
      bottom: {
        laptop: theme.spacing(15),
        desktop: theme.spacing(17),
        desktopMedium: theme.spacing(18),
      },
      right: {
        laptop: theme.spacing(4),
        desktop: theme.spacing(6),
        desktopMedium: theme.spacing(8),
      },
      textTransform: 'capitalize',
      borderRadius: '50px',
      minWidth: '0px',
      color: 'white',
      border: '1px solid white',
      boxShadow: theme.customShadows.Elevation[4].boxShadow,
      background: theme.palette.primary.main,
      span: {
        marginRight: '0px',
        marginLeft: '0px',
      },
      ':hover': {
        boxShadow: 'none',
        color: 'white',
      },
    }),
  },
  chatHistory: {
    chatHistoryButtonFabProps: {
      sx: {
        position: 'absolute',
        top: historyButtonAlign + 1,
        right: historyButtonAlign + 12,
        backgroundColor: 'transparent',
        border: '2px solid #7350FF',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        transition: '1s',
        opacity: 1,
      },
    },
    chatHistoryButtonFabPropsHide: {
      sx: {
        position: 'absolute',
        top: historyButtonAlign + 1,
        right: historyButtonAlign + 12,
        backgroundColor: 'black',
        '&:hover': {
          backgroundColor: 'black',
        },
        border: '2px solid black',
        boxShadow: 'none',
        transition: '0.5s',
        opacity: 0,
        rotate: '360deg',
        pointerEvents: 'none',
      },
    },
    chatHistoryButtonIconProps: {
      sx: {
        fill: '#7350FF',
        stroke: '#7350FF',
      },
    },
    chatHistoryContainerProps: {
      style: {
        position: 'absolute',
        top: historyButtonAlign,
        right: historyButtonAlign,
        width: '320px',
        height: '95%',
        backgroundColor: '#181A20',
        border: '1px solid',
        borderColor: 'purple',
        borderRadius: '15px',
        zIndex: 1000,
        overflowY: 'auto',
        transition: '0.7s',
        opacity: 1,
      },
    },
    chatHistoryContainerClose: {
      style: {
        position: 'absolute',
        top: historyButtonAlign,
        right: historyButtonAlign,
        transition: '0.4s',
        width: 0,
        height: 0,
        opacity: 0,
      },
    },
    chatHistoryTitleContainerProps: {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 15px',
        borderBottom: '1px solid #2F2F2F',
        backgroundColor: '#121317',
        borderTopLeftRadius: '13px',
        borderTopRightRadius: '13px',
      },
    },
    chatHistoryTitleProps: {
      style: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
      },
    },
    closeButtonProps: {
      style: {
        color: '#7350FF',
      },
    },
    chatHistoryContentContainerProps: {
      style: {
        padding: '10px 15px',
      },
    },
    chatHistoryContentProps: {
      style: {
        color: '#9E94A5',
        marginTop: '10px',
      },
    },
    chatHistoryItemProps: {
      style: {
        paddingTop: '8px',
        paddingBottom: '8px',
        borderRadius: '8px',
        color: '#FFFFFF',
      },
    },
  },
};

export default styles;
