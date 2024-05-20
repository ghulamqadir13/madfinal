import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import app from "./Firebase"; // Import the functions you need from the SDKs you need
import { getDatabase, ref, onValue } from "firebase/database";

const FastingScreen = () => {
  const [FastingDetails, setFastingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const dbref = ref(db, "Fasting");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFastingDetails(Object.values(data));
      }
      setLoading(false);
    });
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
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={FastingDetails}
        renderItem={renderDua}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  arabic: {
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
    marginBottom: 5,
  },
  transliteration: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  translation: {
    fontSize: 16,
  },
});

export default FastingScreen;
