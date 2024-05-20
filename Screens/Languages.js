import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const LanguagesScreen = ({ route, navigation }) => {
  const { editionName } = route.params;
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json')
      .then((response) => response.json())
      .then((data) => {
        // Find the edition object corresponding to the selected edition name
        const edition = Object.values(data).find(
          (item) => item.name === editionName
        );
        setLanguages(edition.collection);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [editionName]);

  const handleLanguagePress = (link) => {
    // Navigate to the NextScreen passing the link as a route parameter
    navigation.navigate("SectionsScreen", { link });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Available Languages for {editionName}
      </Text>
      <FlatList
        data={languages}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLanguagePress(item.link)}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.language}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default LanguagesScreen;