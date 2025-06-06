import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../constants/theme';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    marginBottom: 10,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInput,
    error && styles.error,
    style,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;