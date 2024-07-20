const styles = {
  mainGridProps: (
    color,
    inverted,
    extraProps,
    disabled,
    loading,
    disableHover
  ) => ({
    container: true,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    borderRadius: '100px',
    padding: '1px',
    ...extraProps,
    sx: (theme) => ({
      background: () => {
        if (disabled || loading) return theme.palette.Greyscale[650];
        if (inverted) return 'transparent';
        return 'linear-gradient(90deg, #856AFF 0%, #6D4DFF 100%)';
      },
      ...(!disableHover && {
        '&:hover': {
          ...(inverted && {
            background: () => {
              if (disabled || loading) return theme.palette.Greyscale[650];
              return 'linear-gradient(90deg, #856AFF 0%, #6D4DFF 100%)';
            },
          }),
        },
      }),
    }),
  }),
  buttonProps: (
    color,
    bgcolor,
    active,
    extraButtonProps,
    inverted,
    onHoverTextColor,
    disabled,
    loading,
    backgroundColor,
    textColor,
    disableHover
  ) => ({
    sx: (theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      borderRadius: '100px',
      columnGap: '10px',
      textTransform: 'capitalize',
      background: backgroundColor,
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      ...extraButtonProps,
      span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(!inverted && {
          background:
            disabled || loading
              ? theme.palette.Greyscale[650]
              : 'linear-gradient(90deg, #856AFF 0%, #6D4DFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:
            active || disabled || loading ? 'white' : 'transparent',
        }),
        color: () => {
          if (disabled || loading) return theme.palette.Greyscale[400];
          if (inverted) return textColor || 'black';
          return onHoverTextColor;
        },
        height: '100%',
        width: 'auto',
        span: {
          WebkitTextFillColor: 'white',
          marginRight: 1,
        },
      },
      '&:hover': {
        ...(!disableHover && {
          boxShadow: 'none',
          ...(inverted && {
            background:
              disabled || loading ? theme.palette.Greyscale[650] : bgcolor,
          }),
          span: {
            ...(!inverted && {
              WebkitTextFillColor:
                onHoverTextColor || theme.palette.Common.White['100p'],
            }),
            ...(inverted && {
              background: 'linear-gradient(90deg, #856AFF 0%, #6D4DFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: active ? 'white' : 'transparent',
            }),
          },
          svg: {
            color: !inverted
              ? onHoverTextColor
              : 'linear-gradient(90deg, #856AFF 0%, #6D4DFF 100%)',
            path: {
              stroke: !inverted
                ? onHoverTextColor
                : 'linear-gradient(90deg, #856AFF 0%, #6D4DFF 100%)',
            },
          },
        }),
        ...(disableHover && {
          backgroundColor,
          color: 'inherit',
          cursor: 'default',
        }),
      },
    }),
  }),
};

export default styles;
