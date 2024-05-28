import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from "../FirebaseFolder/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";

const HajjScreen = () => {
  const [HajjDetails, setHajjDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = await AsyncStorage.getItem('HajjDetails');
      if (cachedData) {
        setHajjDetails(JSON.parse(cachedData));
      } else {
        const db = getDatabase(app);
        const dbref = ref(db, 'Hajj');
        onValue(dbref, (snapshot) => {
          const data = snapshot.val();
          setHajjDetails(data);
          AsyncStorage.setItem('HajjDetails', JSON.stringify(data));
        });
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.Description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hajj Details</Text>
      <Text style={styles.subtitle}>Embark on your Hajj journey with confidence and clarity. Discover step-by-step guidance to fulfill this sacred pilgrimage.</Text>
      <FlatList
        data={HajjDetails}
        renderItem={renderItem}
        keyExtractor={item => item.step.toString()}
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
  subtitle: {
    fontSize: 16,
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
  itemDescription: {
    fontSize: 16,
    color: 'white',
  },
});

export default HajjScreen;