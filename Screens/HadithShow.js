import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const HadithDisplay = () => {
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRandomHadith = async () => {
    setLoading(true);
    try {
      const randomNumber = Math.floor(Math.random() * 5000) + 1;
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud/${randomNumber}.json`
      );
      const data = await response.json();
      if (data.hadiths && data.hadiths.length > 0) {
        const randomHadith = data.hadiths[0];
        setHadith({
          text: randomHadith.text,
          reference: randomHadith.reference,
        });
      } else {
        setHadith(null);
      }
    } catch (error) {
      console.error("Error fetching hadith:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRandomHadith();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : hadith ? (
        <View>
          <Text style={{fontSize:15}}>
            <Text style={{ fontWeight: "bold" ,fontSize:20}}> ---Hadith Text:</Text>
            {"\n"}
            {hadith.text}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}> Reference Book: </Text>
            {hadith.reference.book}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}> Reference Hadith: </Text>
            {hadith.reference.hadith}
          </Text>
          
        </View>
      ) : (
        <Text>No hadith available</Text>
      )}
    </View>
  );
};

export default HadithDisplay;
