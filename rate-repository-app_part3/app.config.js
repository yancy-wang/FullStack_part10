// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'rate-repository-app',
    slug: 'rate-repository-app',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    ios: {
      supportsTablet: true
    },
    android: {},
    web: {
      bundler: 'metro',
      output: 'static',
    },
    plugins: [
      'expo-router'
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apolloUri: process.env.APOLLO_URI || 'http://localhost:4000',
    },
  }
};