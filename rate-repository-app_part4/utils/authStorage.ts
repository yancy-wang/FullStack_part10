import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  private namespace: string;

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken(): Promise<string | null> {
    try {
      const accessToken = await AsyncStorage.getItem(
        `${this.namespace}:accessToken`,
      );
      return accessToken;
    } catch (e) {
      console.log('Error getting access token:', e);
      return null;
    }
  }

  async setAccessToken(accessToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        accessToken,
      );
    } catch (e) {
      console.log('Error setting access token:', e);
    }
  }

  async removeAccessToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (e) {
      console.log('Error removing access token:', e);
    }
  }
}

export default AuthStorage;