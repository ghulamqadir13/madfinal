import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from "./Firebase";
import { getDatabase, ref, onValue } from "firebase/database";

const UmrahScreen = () => {
  const [UmrahDetails, setUmrahDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUmrahDetails = async () => {
      try {
        const cachedUmrahDetails = await AsyncStorage.getItem('UmrahDetails');
        if (cachedUmrahDetails) {
          setUmrahDetails(JSON.parse(cachedUmrahDetails));
          setLoading(false);
        } else {
          const db = getDatabase(app);
          const dbref = ref(db, "umrah");
          onValue(dbref, (snapshot) => {
            const data = snapshot.val();
            setUmrahDetails(data);
            setLoading(false);
            AsyncStorage.setItem('UmrahDetails', JSON.stringify(data));
          });
        }
      } catch (error) {
        console.error("Error fetching Umrah details:", error);
        setLoading(false);
      }
    };

    fetchUmrahDetails();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>
        {item.stepNumber}. {item.title}
      </Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <FlatList
        data={item.actions}
        renderItem={({ item }) => (
          <Text style={styles.actionItem}>- {item}</Text>
        )}
        keyExtractor={(action, index) => index.toString()}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  if (!UmrahDetails) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Umrah Guidance</Text>
      <Text style={styles.subtitle}>Embark on your Umrah journey with confidence and clarity. Discover step-by-step guidance to fulfill this sacred pilgrimage.</Text>
      <FlatList
        data={UmrahDetails.steps}
        renderItem={renderItem}
        keyExtractor={(item) => item.stepNumber.toString()}
        ListHeaderComponent={() => (
          <View style={styles.introductionContainer}>
            <Text style={styles.introductionTitle}>Introduction</Text>
            <Text style={styles.introductionText}>
              {UmrahDetails.introduction?.definition}
            </Text>
            <Text style={styles.introductionText}>
              {UmrahDetails.introduction?.significance}
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.additionalInfoContainer}>
            <Text style={styles.additionalInfoTitle}>Additional Information</Text>
            <Text style={styles.subTitle}>Recommended Prayers</Text>
            <FlatList
              data={UmrahDetails.additionalInformation?.recommendedPrayers || []}
              renderItem={({ item }) => (
                <Text style={styles.additionalInfoText}>- {item}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.subTitle}>Important Notes</Text>
            <FlatList
              data={UmrahDetails.additionalInformation?.importantNotes || []}
              renderItem={({ item }) => (
                <Text style={styles.additionalInfoText}>- {item}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    paddingTop: 40,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
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
  introductionContainer: {
    padding: 16,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
  },
  introductionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 8,
    textAlign: 'center',
  },
  introductionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  itemContainer: {
    backgroundColor: 'gray',
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
    color: 'purple',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  itemDescription: {
    fontSize: 16,
    color: 'white',
  },
  actionItem: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 16,
  },
  additionalInfoContainer: {
    padding: 16,
    backgroundColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
  additionalInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 8,
  },
  additionalInfoText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
});

export default UmrahScreen;
