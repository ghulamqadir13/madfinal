import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const LanguagesScreen = ({ route }) => {
  const { editionName } = route.params;
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json`)
      .then((response) => response.json())
      .then((data) => {
        // Find the edition object corresponding to the selected edition name
        const edition = Object.values(data).find(
          (item) => item.name === editionName
        );
        // Extract language names from the collection of the selected edition
        const langArray = edition.collection.map((item) => item.language);
        setLanguages(langArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [editionName]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Available Languages for {editionName}
      </Text>
      <FlatList
        data={languages}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {/* handle onPress event */}}>
            <Text
              key={`${item}-${index}`}
              style={{ fontSize: 16, marginBottom: 5 }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
    </View>
  );
};

export default LanguagesScreen;
