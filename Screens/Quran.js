import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuranScreen = ({ navigation }) => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurahs, setFilteredSurahs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.alquran.cloud/v1/quran/quran-uthmani');
        const data = await response.json();
        setSurahs(data.data.surahs);
        setFilteredSurahs(data.data.surahs); // Set initial filtered surahs
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Ensure loading state is updated even in case of error
      }
    };

    fetchData();
  }, []);

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
        <ActivityIndicator size="large" color="#6200EE" />
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
        <FlatList
          data={filteredSurahs}
          renderItem={renderSurah}
          keyExtractor={(item) => item.number.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple', 
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 60,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333', 
  },
  surahContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'gray', 
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 50,
    elevation: 2,
  },
  surahNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white', 
    marginRight: 15,
  },
  surahDetails: {
    flex: 1,
    paddingRight: 10,
  },
  surahName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white', 
  },
  englishName: {
    fontSize: 16,
    color: 'white', 
    marginTop: 5,
    marginLeft: 110,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuranScreen;