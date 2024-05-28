import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HadithScreen = ({ navigation }) => {
  const [editionNames, setEditionNames] = useState([]);

  useEffect(() => {
    const fetchEditionNames = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json');
        const data = await response.json();
        const names = Object.keys(data).map((key) => data[key].name);
        setEditionNames(names);
        // Store edition names in AsyncStorage for future use
        await AsyncStorage.setItem('EditionNames', JSON.stringify(names));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEditionNames();
  }, []);

  const handleEditionPress = (editionName) => {
    navigation.navigate('LanguagesScreen', { editionName });
  };

  // Function to add dots at the start of every book name
  const addDotsToBookNames = (name) => {
    const nameWithDots = '● ' + name;
    return nameWithDots;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Hadith Edition Names</Text>
        <FlatList
          data={editionNames}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleEditionPress(item)} style={styles.itemContainer}>
              <Text style={styles.item}>{addDotsToBookNames(item)}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    padding: 30,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  itemContainer: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default HadithScreen;
