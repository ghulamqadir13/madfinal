import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const SectionsScreen = ({ route }) => {
  const { link } = route.params;
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHadiths, setFilteredHadiths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(link);
        const data = await response.json();
        setHadiths(data.hadiths);
        setFilteredHadiths(data.hadiths); // Set initial filtered Hadiths
        setLoading(false);
        // Store fetched Hadiths in AsyncStorage for future use
        await AsyncStorage.setItem('FetchedHadiths', JSON.stringify(data.hadiths));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [link]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = hadiths.filter((hadith) =>
        hadith.hadithnumber.toString().includes(searchQuery)
      );
      setFilteredHadiths(filtered);
    } else {
      setFilteredHadiths(hadiths);
    }
  }, [searchQuery, hadiths]);

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = hadiths.filter((hadith) =>
        hadith.hadithnumber.toString().includes(searchQuery)
      );
      setFilteredHadiths(filtered);
    } else {
      setFilteredHadiths(hadiths);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={25} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Hadith Number"
            value={searchQuery}
            onChangeText={setSearchQuery}
            keyboardType="numeric"
          />
        </View>
        <FlatList
          data={filteredHadiths}
          renderItem={({ item }) => (
            <View style={styles.hadithContainer}>
              <Text style={styles.hadithNumber}>
                Hadith Number: {item.hadithnumber}
              </Text>
              <Text style={{fontSize:18}}>{item.text}</Text>
              <Text style={styles.gradesTitle}>Grades:</Text>
              <FlatList
                data={item.grades}
                renderItem={({ item }) => (
                  <Text style={styles.gradeItem} key={item.name}>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 60,
    borderRadius: 25,
    marginTop: 10,
    paddingHorizontal: 15,
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
  hadithContainer: {
    marginBottom: 20,
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 2,
  },
  hadithNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'gray',
  },
  gradesTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: 'gray',
  },
  gradeItem: {
    marginLeft: 10,
    fontSize: 14,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SectionsScreen;