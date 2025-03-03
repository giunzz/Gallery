module.exports = {
  dependencies: {
    '@shopify/react-native-skia': {
      platforms: {
        android: {}, // Explicitly tell React Native that this module is manually linked
        ios: {},
      },
    },
  },
};
