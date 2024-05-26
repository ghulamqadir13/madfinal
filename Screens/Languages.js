import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguagesScreen = ({ route, navigation }) => {
  const { editionName } = route.params;
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json');
        const data = await response.json();
        // Find the edition object corresponding to the selected edition name
        const edition = Object.values(data).find(
          (item) => item.name === editionName
        );
        setLanguages(edition.collection);
        // Store languages in AsyncStorage for future use
        await AsyncStorage.setItem('Languages', JSON.stringify(edition.collection));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLanguages();
  }, [editionName]);

  const handleLanguagePress = (link) => {
    navigation.navigate("SectionsScreen", { link });
  };

  // Function to add a dot at the start of each language
  const addDotToLanguage = (language) => {
    return '● ' + language;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          Available Languages for {editionName}
        </Text>
        <FlatList
          data={languages}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLanguagePress(item.link)} style={styles.languageContainer}>
              <Text style={styles.language}>{addDotToLanguage(item.language)}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  languageContainer: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  language: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LanguagesScreen;