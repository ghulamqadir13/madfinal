import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const HadithDataScreen = ({ route }) => {
  const { editionName, language } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [hadithData, setHadithData] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionName}-${language}.json`;

  useEffect(() => {
    // console.log("Fetching data from:", apiUrl); // Console log the URL being used
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setHadithData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [apiUrl]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : hadithData ? (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Hadith Data for {editionName} - {language}
          </Text>
          {/* Display fetched hadith data here */}
          {/* Example: Display the first hadith */}
          <Text>{hadithData[0].text}</Text>
        </View>
      ) : (
        <Text>No data available for {editionName} - {language}</Text>
      )}
      
    </View>
  );
};


export default HadithDataScreen;
