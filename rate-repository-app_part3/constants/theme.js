import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
    repositoryItemBackground: 'white',
    error: '#d73a49',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: 'normal',
    bold: 'bold',
  },
};

export default theme;