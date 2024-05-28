import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from "../../FirebaseFolder/Firebase"; // Import the functions you need from the SDKs you need
import { getDatabase, ref, onValue } from "firebase/database";

const FastingScreen = () => {
  const [FastingDetails, setFastingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('FastingDetails');
        if (storedData) {
          setFastingDetails(JSON.parse(storedData));
          setLoading(false);
        } else {
          fetchDataFromFirebase();
        }
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    const fetchDataFromFirebase = () => {
      const db = getDatabase(app);
      const dbref = ref(db, "Fasting");
      onValue(dbref, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fastingData = Object.values(data);
          setFastingDetails(fastingData);
          try {
            await AsyncStorage.setItem('FastingDetails', JSON.stringify(fastingData));
          } catch (error) {
            console.error("Error saving data", error);
          }
        }
        setLoading(false);
      });
    };

    loadData();
  }, []);

  const renderDua = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.arabic}>{item.arabic}</Text>
      <Text style={styles.transliteration}>{item.transliteration}</Text>
      <Text style={styles.translation}>{item.translation}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Fasting Details</Text>
      <Text style={styles.description}>
        Below are the details of fasting, including various prayers (dua) in Arabic, their transliteration, and translation.
      </Text>
      <FlatList
        data={FastingDetails}
        renderItem={renderDua}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple', // Light gray background
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ffffff', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#6a0dad', // Purple background
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginBottom: 5,
  },
  arabic: {
    fontSize: 18,
    color: '#dcdcdc', // Light gray text
    textAlign: 'right',
    marginBottom: 5,
  },
  transliteration: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ffffff', // White text
    marginBottom: 5,
  },
  translation: {
    fontSize: 16,
    color: '#ffffff', // White text
  },
});

export default FastingScreen;
