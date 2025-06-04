// app/(tabs)/signout.tsx
import { View } from 'react-native';
import Text from '../../components/ui/ThemedText';

export default function SignOutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signing out...</Text>
    </View>
  );
}