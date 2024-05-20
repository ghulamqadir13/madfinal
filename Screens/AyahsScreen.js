import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AyahsScreen = ({ navigation, route }) => {
  const { surah } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef();
  const [bookmarkedPage, setBookmarkedPage] = useState(null);

  useEffect(() => {
    const getBookmarkedPage = async () => {
      try {
        const page = await AsyncStorage.getItem(`bookmark_${surah.number}`);
        if (page !== null) {
          setBookmarkedPage(parseInt(page, 10));
        }
      } catch (error) {
        console.error('Error retrieving bookmarked page:', error);
      }
    };

    getBookmarkedPage();
  }, [surah.number]);

  const saveBookmark = async (pageNumber) => {
    try {
      await AsyncStorage.setItem(`bookmark_${surah.number}`, pageNumber.toString());
      Alert.alert('Bookmark Saved', `Page ${pageNumber} has been bookmarked.`);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const goToBookmarkedPage = () => {
    if (bookmarkedPage !== null && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: screenWidth * (bookmarkedPage - 1), animated: true });
    } else {
      Alert.alert('No Bookmark', 'There is no bookmarked page for this Surah.');
    }
  };

  const renderPage = (pageData, pageNumber) => (
    <View key={pageNumber} style={{ width: screenWidth, padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
        {surah.name} - {surah.englishName} (Page {pageNumber})
      </Text>
      {pageData.map((ayah, index) => (
        <View key={ayah.number} style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 16 }}>{ayah.text}</Text>
          {(index === pageData.length - 1 || ayah.ruku !== pageData[index + 1].ruku) && (
            <Text style={{ fontSize: 14, fontStyle: 'italic', color: '#888' }}>
              Page: {ayah.page} - Ruku: {ayah.ruku} - Sajda: {ayah.sajda ? 'Yes' : 'No'}
            </Text>
          )}
        </View>
      ))}
      <Button title="Bookmark this Page" onPress={() => saveBookmark(pageNumber)} />
    </View>
  );

  const renderPages = () => {
    const pages = [];
    let currentPage = [];
    let currentPageNumber = surah.ayahs[0].page;
    let currentRuku = surah.ayahs[0].ruku;

    surah.ayahs.forEach((ayah) => {
      if (ayah.page === currentPageNumber) {
        currentPage.push(ayah);
      } else {
        if (ayah.ruku !== currentRuku) {
          pages.push(renderPage(currentPage, currentPageNumber));
          currentPage = [ayah];
          currentPageNumber = ayah.page;
          currentRuku = ayah.ruku;
        } else {
          currentPage.push(ayah);
        }
      }
    });

    if (currentPage.length > 0) {
      pages.push(renderPage(currentPage, currentPageNumber));
    }

    return pages;
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Go to Bookmarked Page" onPress={goToBookmarkedPage} />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {renderPages()}
      </ScrollView>
    </View>
  );
};

export default AyahsScreen;
