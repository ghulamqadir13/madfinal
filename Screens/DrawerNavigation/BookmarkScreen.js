import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksScreen = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const bookmarkKeys = keys.filter(key => key.startsWith('bookmark_'));
        const storedBookmarks = await AsyncStorage.multiGet(bookmarkKeys);

        const formattedBookmarks = storedBookmarks.map(([key, value]) => {
          const surahNumber = key.replace('bookmark_', '');
          return { id: key, surahNumber, pageNumber: parseInt(value, 10) };
        });

        setBookmarks(formattedBookmarks);
      } catch (error) {
        console.error('Error retrieving bookmarks:', error);
      }
    };

    getBookmarks();
  }, []);

  const removeBookmark = async (bookmarkId) => {
    try {
      await AsyncStorage.removeItem(bookmarkId);
      setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.id !== bookmarkId));
      Alert.alert('Bookmark Removed', 'The bookmark has been successfully removed.');
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const renderBookmark = ({ item }) => (
    <View key={item.id} style={styles.itemContainer}>
      <Text style={styles.itemTitle}>Surah Number: {item.surahNumber} - Page: {item.pageNumber}</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Go to Page" 
          onPress={() => navigation.navigate('AyahsScreen', { surah: { number: parseInt(item.surahNumber, 10) }, initialPage: item.pageNumber })}
          color="black"
        />
        <Button 
          title="Delete" 
          onPress={() => removeBookmark(item.id)} 
          color="black"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bookmarked Pages</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={renderBookmark}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'purple',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#6a0dad',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default BookmarksScreen;
