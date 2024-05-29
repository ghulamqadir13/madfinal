import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCustomHook from './useCustomHook';
import CustomButton from './CustomButton';  // Adjust the import path as necessary
import styles from './styles';  // Adjust the import path as necessary

const QuranScreen = ({ navigation }) => {
  const { data: surahs, loading, error } = useCustomHook('http://api.alquran.cloud/v1/quran/quran-uthmani');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurahs, setFilteredSurahs] = useState([]);

  useEffect(() => {
    if (surahs.length) {
      setFilteredSurahs(surahs); // Set initial filtered surahs when data is loaded
    }
  }, [surahs]);

  useEffect(() => {
    const loadSearchQuery = async () => {
      try {
        const savedSearchQuery = await AsyncStorage.getItem('searchQuery');
        if (savedSearchQuery !== null) {
          setSearchQuery(savedSearchQuery);
        }
      } catch (error) {
        console.error('Error loading search query:', error);
      }
    };

    loadSearchQuery();
  }, []);

  useEffect(() => {
    const saveSearchQuery = async () => {
      try {
        await AsyncStorage.setItem('searchQuery', searchQuery);
      } catch (error) {
        console.error('Error saving search query:', error);
      }
    };

    saveSearchQuery();
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = surahs.filter((surah) =>
        surah.number.toString().includes(searchQuery) ||
        surah.name.includes(searchQuery) ||
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSurahs(filtered);
    } else {
      setFilteredSurahs(surahs);
    }
  }, [searchQuery, surahs]);

  const handleSurahPress = (surah) => {
    navigation.navigate('AyahsScreen', { surah });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Surah number, name or English name"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView>
          {filteredSurahs.map((surah) => (
            <CustomButton
              key={surah.number.toString()}
              onPress={() => handleSurahPress(surah)}
              title={`Surah ${surah.number} - ${surah.name} (${surah.englishName})`}
              style={{ backgroundColor: 'gray' }}  // Override style if needed
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default QuranScreen;
