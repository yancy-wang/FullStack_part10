import React from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import theme from '../constants/theme';
import Text from './ui/ThemedText';

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
}

interface ButtonStyles {
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<ButtonStyles>({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold as 'bold',
  },
});

const Button = ({ onPress, children, style, ...props }: ButtonProps) => {
  const buttonStyle = typeof style === 'function' ? style({ pressed: false }) : style;

  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default Button;