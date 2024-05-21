import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import  app  from './Firebase'; // Ensure you have your Firebase app configuration here

const NamazJanazaDuaScreen = () => {
  const [NamazaJanazaDuaDetails, setNamazaJanazaDuaDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const dbref = ref(db, "namaz_e_janaza_duas");
    const unsubscribe = onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNamazaJanazaDuaDetails(Object.values(data));
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.arabic}>{item.arabic}</Text>
      <Text style={styles.transliteration}>{item.transliteration}</Text>
      <Text style={styles.translation}>{item.translation}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={NamazaJanazaDuaDetails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  arabic: {
    fontSize: 16,
    color: '#2b2b2b',
    marginBottom: 10,
  },
  transliteration: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  translation: {
    fontSize: 14,
    color: '#333',
  },
});

export default NamazJanazaDuaScreen;
