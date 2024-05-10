// AyahsScreen.js

import React from 'react';
import { View, Text } from 'react-native';

const AyahsScreen = ({ navigation, route }) => {
  const { surah } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{surah.name}</Text>
      {/* Display Ayahs text for the selected Surah */}
    </View>
  );
};

export default AyahsScreen;
