import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const HadithScreen = ({ navigation }) => {
  const [editionNames, setEditionNames] = useState([]);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json')
      .then((response) => response.json()) // Parse response to JSON directly
      .then((data) => {
        const names = Object.keys(data).map((key) => data[key].name);
        setEditionNames(names);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEditionPress = (editionName) => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate('LanguagesScreen', { editionName });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Hadith Edition Names</Text>
      <FlatList
        data={editionNames}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditionPress(item)}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default HadithScreen;