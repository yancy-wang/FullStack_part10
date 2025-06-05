import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  namespace: string;
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
      console.log(e);
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
      console.log(e);
    }
  }

  async removeAccessToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AuthStorage;