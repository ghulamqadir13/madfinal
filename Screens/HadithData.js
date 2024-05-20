import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, TextInput } from "react-native";

const HadithDataScreen = ({ route }) => {
  const { editionName, language } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [hadithData, setHadithData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionName}-${language}.json`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setHadithData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [apiUrl]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = hadithData.filter((item) =>
        item.hadithnumber.toString().includes(text)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(hadithData);
    }
  };

  const renderHadithItem = ({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Hadith {item.hadithnumber}</Text>
      <Text>{item.text}</Text>
      <Text>Grades:</Text>
      {item.grades && item.grades.map((grade, index) => (
        <Text key={index}>- {grade.name}: {grade.grade}</Text>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Search by Hadith Number"
            value={searchText}
            onChangeText={handleSearch}
            keyboardType="numeric"
          />
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              renderItem={renderHadithItem}
              keyExtractor={(item) => item.hadithnumber.toString()}
            />
          ) : (
            <Text>No data available for {editionName} - {language}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default HadithDataScreen;
