// utils/authStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
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

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        accessToken,
      );
    } catch (e) {
      console.log(e);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AuthStorage;