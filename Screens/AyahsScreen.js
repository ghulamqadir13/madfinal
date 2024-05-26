import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AyahsScreen = ({ navigation, route }) => {
  const { surah, initialPage } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef();
  const [fullSurah, setFullSurah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Received surah:', surah);
    console.log('Received initialPage:', initialPage);

    const fetchSurahDetails = async () => {
      try {
        const response = await fetch(`http://api.alquran.cloud/v1/surah/${surah.number}`);
        const data = await response.json();
        setFullSurah(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surah details:', error);
        setLoading(false);
      }
    };

    if (surah.number) {
      fetchSurahDetails();
    }
  }, [surah.number]);

  useEffect(() => {
    if (!loading && initialPage && scrollViewRef.current) {
      console.log('Scrolling to initialPage:', initialPage);
      setTimeout(() => {
        const targetX = screenWidth * (initialPage - 1);
        scrollViewRef.current.scrollTo({ x: targetX, animated: true });
      }, 100); // 100ms delay to ensure content is rendered before scrolling
    }
  }, [loading, initialPage]);

  const saveBookmark = async (pageNumber) => {
    try {
      await AsyncStorage.setItem(`bookmark_${surah.number}`, pageNumber.toString());
      Alert.alert('Bookmark Saved', `Page ${pageNumber} has been bookmarked.`);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const renderPage = (pageData, pageNumber) => (
    <ScrollView key={pageNumber} style={styles.pageContainer}>
      <Text style={styles.pageTitle}>
        {fullSurah.name} - {fullSurah.englishName} (Page {pageNumber})
      </Text>
      {pageData.map((ayah, index) => (
        <View key={ayah.number} style={styles.ayahContainer}>
          <Text style={styles.ayahText}>{ayah.text}</Text>
          {(index === pageData.length - 1 || ayah.ruku !== pageData[index + 1].ruku) && (
            <Text style={styles.ayahDetails}>
              Page: {ayah.page} - Ruku: {ayah.ruku} - Sajda: {ayah.sajda ? 'Yes' : 'No'}
            </Text>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.bookmarkButton} onPress={() => saveBookmark(pageNumber)}>
        <Text style={styles.bookmarkButtonText}>Bookmark this Page</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderPages = () => {
    if (!fullSurah?.ayahs) {
      return <Text style={styles.errorText}>No ayahs available for this surah.</Text>;
    }

    const pages = [];
    let currentPage = [];
    let currentPageNumber = fullSurah.ayahs[0].page;

    fullSurah.ayahs.forEach((ayah) => {
      if (ayah.page === currentPageNumber) {
        currentPage.push(ayah);
      } else {
        pages.push(renderPage(currentPage, currentPageNumber));
        currentPage = [ayah];
        currentPageNumber = ayah.page;
      }
    });

    if (currentPage.length > 0) {
      pages.push(renderPage(currentPage, currentPageNumber));
    }

    return pages;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {renderPages()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    width: Dimensions.get('window').width,
    padding: 20,
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginBottom: 15,
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    paddingBottom: 10,
  },
  ayahContainer: {
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'black',
    paddingBottom: 10,
  },
  ayahText: {
    fontSize: 25,
    color: 'white',
    marginBottom: 5,
  },
  ayahDetails: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
    marginTop: 5,
  },
  bookmarkButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  bookmarkButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AyahsScreen;
