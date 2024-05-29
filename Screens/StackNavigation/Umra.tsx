import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {app} from "../FirebaseFolder/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";

interface UmrahStep {
  stepNumber: number;
  title: string;
  description: string;
  actions: string[];
}

interface UmrahIntroduction {
  definition: string;
  significance: string;
}

interface AdditionalInformation {
  recommendedPrayers: string[];
  importantNotes: string[];
}

interface UmrahDetails {
  introduction?: UmrahIntroduction;
  steps: UmrahStep[];
  additionalInformation?: AdditionalInformation;
}

interface UmrahScreenState {
  umrahDetails: UmrahDetails | null;
  loading: boolean;
}

class UmrahScreen extends Component<{}, UmrahScreenState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      umrahDetails: null,
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const cachedUmrahDetails = await AsyncStorage.getItem('UmrahDetails');
      if (cachedUmrahDetails) {
        this.setState({ umrahDetails: JSON.parse(cachedUmrahDetails), loading: false });
      } else {
        const db = getDatabase(app);
        const dbref = ref(db, "umrah");
        onValue(dbref, (snapshot) => {
          const data = snapshot.val();
          this.setState({ umrahDetails: data, loading: false });
          AsyncStorage.setItem('UmrahDetails', JSON.stringify(data));
        });
      }
    } catch (error) {
      console.error("Error fetching Umrah details:", error);
      this.setState({ loading: false });
    }
  }

  renderItem = ({ item }: { item: UmrahStep }) => (
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

  render() {
    const { loading, umrahDetails } = this.state;

    if (loading) {
      return (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </SafeAreaView>
      );
    }

    if (!umrahDetails) {
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
          data={umrahDetails.steps}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.stepNumber.toString()}
          ListHeaderComponent={() => (
            <View style={styles.introductionContainer}>
              <Text style={styles.introductionTitle}>Introduction</Text>
              <Text style={styles.introductionText}>
                {umrahDetails.introduction?.definition}
              </Text>
              <Text style={styles.introductionText}>
                {umrahDetails.introduction?.significance}
              </Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.additionalInfoTitle}>Additional Information</Text>
              <Text style={styles.subTitle}>Recommended Prayers</Text>
              <FlatList
                data={umrahDetails.additionalInformation?.recommendedPrayers || []}
                renderItem={({ item }) => (
                  <Text style={styles.additionalInfoText}>- {item}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <Text style={styles.subTitle}>Important Notes</Text>
              <FlatList
                data={umrahDetails.additionalInformation?.importantNotes || []}
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
  }
}

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
    backgroundColor: '#6a0dad',
    borderRadius: 10,
    marginBottom: 10,
  },
  introductionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  introductionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
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
    color: '#ffffff',
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
