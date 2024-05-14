import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

const AyahsScreen = ({ navigation, route }) => {
  const { surah } = route.params;
  const screenWidth = Dimensions.get('window').width;

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
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {renderPages()}
    </ScrollView>
  );
};

export default AyahsScreen;