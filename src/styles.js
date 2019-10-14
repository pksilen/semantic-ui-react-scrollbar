// @flow

const styles = {
  scrollbar: {
    horizontal: {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      left: 0,
      position: 'absolute',
      width: '100%'
    },
    vertical: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0
    }
  },
  button: {
    flexShrink: 0,
    fontSize: '1.2rem',
    lineHeight: '1.2rem'
  },
  track: {
    horizontal: {
      background: 'rgba(0, 0, 0, 0.1)',
      flexGrow: 1,
      height: '0.8rem'
    },
    vertical: {
      background: 'rgba(0, 0, 0, 0.1)',
      flexGrow: 1,
      width: '0.8rem'
    }
  },
  thumb: {
    background: 'rgb(0, 0, 0)',
    height: '0.8rem',
    width: '0.8rem'
  }
};

export default styles;
