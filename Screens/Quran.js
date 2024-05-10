// QuranScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const QuranScreen = ({ navigation }) => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.alquran.cloud/v1/quran/quran-uthmani');
        const data = await response.json();
        setSurahs(data.data.surahs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderSurah = ({ item }) => (
    <TouchableOpacity onPress={() => handleSurahPress(item)} style={styles.surahContainer}>
      <Text style={styles.surahNumber}>Surah {item.number}</Text>
      <View style={styles.surahDetails}>
        <Text style={styles.surahName}>{item.name}</Text>
        <Text style={styles.englishName}>{item.englishName}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSurahPress = (surah) => {
    navigation.navigate('AyahsScreen', { surah });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={surahs}
      renderItem={renderSurah}
      keyExtractor={(item) => item.number.toString()}
    />
  );
};

const styles = StyleSheet.create({
  surahContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  surahNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  surahDetails: {
    flex: 1,
    marginLeft: 10,
  },
  surahName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  englishName: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuranScreen;
