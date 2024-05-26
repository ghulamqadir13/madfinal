import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
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
    <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>Surah Number: {item.surahNumber} - Page: {item.pageNumber}</Text>
      <View style={{ flexDirection: 'column' }}>
        <Button title="Go to Page" onPress={() => navigation.navigate('AyahsScreen', { surah: { number: parseInt(item.surahNumber, 10) }, initialPage: item.pageNumber })} />
        <Button title="Delete" onPress={() => removeBookmark(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bookmarked Pages</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={renderBookmark}
      />
    </View>
  );
};

export default BookmarksScreen;
