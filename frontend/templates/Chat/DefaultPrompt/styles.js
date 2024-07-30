import { MarginOutlined } from "@mui/icons-material";

/**
 * Styles for the DefaultPrompt component
 */
const styles = {
  defaultPromptsGridContainer: {
    container: true,
    sx: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      marginBottom: '10px',
      marginLeft:'10px'
    },
  },
  defaultPrompt: {
    container: true,
    item: true,
    sx: {
      position: 'relative',
      padding: '5px 10px',
      display: 'flex',
      alignItems: 'center',
      flex: '1',
      backgroundColor: 'transparent',
      color: '#5e20f4',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '10px',
        padding: '2px',
        background: 'linear-gradient(45deg, #a597cc, #5e20f3)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      },
      '&:hover': {
        backgroundColor: '#5e20f4',
        color: 'white',
        '&::after': {
          background: 'white',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
  },
  menuLogo: {
    marginRight: '10px',
  },
  promptContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  promptText: {
    flex: 1,
    overflow: 'hidden',
  },
};

export default styles;