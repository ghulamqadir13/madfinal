import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, SectionList } from "react-native";

const SectionsScreen = ({ route }) => {
  const { link } = route.params;
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(link)
      .then((response) => {
        // Log the response before trying to parse it
        // console.log("Response from server:", response);
        return response.json();
      })
      .then((data) => {
        // Log the parsed data to check if it's valid JSON
        // console.log("Parsed data:", data);
        setHadiths(data.hadiths);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [link]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Data fetched from: {link}</Text>
      <FlatList
        data={hadiths}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Hadith Number: {item.hadithnumber}
            </Text>
            <Text>{item.text}</Text>
            <Text style={{ fontWeight: "bold" }}>Grades:</Text>
            <FlatList
              data={item.grades}
              renderItem={({ item }) => (
                <Text key={item.name} style={{ marginLeft: 10 }}>
                  {item.name}: {item.grade}
                </Text>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        )}
        keyExtractor={(item) => item.hadithnumber.toString()}
      />
    </View>
  );
};

export default SectionsScreen;