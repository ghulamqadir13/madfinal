import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import app from "./Firebase"; // Import the functions you need from the SDKs you need
import { getDatabase, ref, onValue } from "firebase/database";

const UmrahScreen = () => {
  const [UmrahDetails, setUmrahDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const dbref = ref(db, "umrah");
    console.log("receiving data");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      setUmrahDetails(data);
      setLoading(false); // Set loading to false after data is fetched
      // console.log(data);
    });
  }, []); // Add an empty dependency array to run the effect only once

  const renderItem = ({ item }) => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>
        {item.stepNumber}. {item.title}
      </Text>
      <Text style={styles.stepDescription}>{item.description}</Text>
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
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!UmrahDetails) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Failed to load data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  introductionContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  introductionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  introductionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  stepContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionItem: {
    fontSize: 16,
    paddingLeft: 16,
  },
  additionalInfoContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  additionalInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  additionalInfoText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default UmrahScreen;
