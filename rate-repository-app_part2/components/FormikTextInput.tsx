// components/FormikTextInput.tsx
import { FieldHookConfig, useField } from 'formik';
import { StyleSheet, TextInputProps, View } from 'react-native';
import theme from '../constants/theme';
import TextInput from './TextInput';
import Text from './ui/ThemedText';

type FormikTextInputProps = TextInputProps & FieldHookConfig<string> & {};

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 10,
    color: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }: FormikTextInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;