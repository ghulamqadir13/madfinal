import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../../FirebaseFolder/Firebase'; // Ensure you have your Firebase app configuration here


const orderedKeys = [
    "entering_ihram",
    "entering_makkah",
    "seeing_kaaba",
    "tawaf_start",
    "between_rukn_yamani_and_black_stone",
    "after_completing_tawaf",
    "safa_and_marwah",
    "at_safa",
    "between_safa_and_marwah",
    "after_safa_and_marwah",
    "haircut_or_shave"
];

const UmrahDuaScreen = () => {
    const [UmrahDuaDetails, setUmrahDuaDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('UmrahDuaDetails');
                if (storedData) {
                    setUmrahDuaDetails(JSON.parse(storedData));
                    setLoading(false);
                } else {
                    fetchDataFromFirebase();
                }
            } catch (error) {
                console.error("Error loading data", error);
            }
        };

        const fetchDataFromFirebase = () => {
            const db = getDatabase(app);
            const dbref = ref(db, "umrah_duas");
            onValue(dbref, async (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const orderedData = orderedKeys.map(key => data[key]);
                    setUmrahDuaDetails(orderedData);
                    try {
                        await AsyncStorage.setItem('UmrahDuaDetails', JSON.stringify(orderedData));
                    } catch (error) {
                        console.error("Error saving data", error);
                    }
                }
                setLoading(false);
            });
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Umrah Dua Details</Text>
            <Text style={styles.description}>
                Below are the details of Umrah duas, including the prayers in Arabic, their transliteration, and translation.
            </Text>
            <FlatList
                data={UmrahDuaDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <DuaItem
                        title={item.title}
                        arabic={item.arabic}
                        transliteration={item.transliteration}
                        translation={item.translation}
                    />
                )}
            />
        </SafeAreaView>
    );
};

const DuaItem = ({ title, arabic, transliteration, translation }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.arabic}>{arabic}</Text>
            <Text style={styles.transliteration}>{transliteration}</Text>
            <Text style={styles.translation}>{translation}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple', // Light gray background
        padding: 20,
        marginTop: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', // White text
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#ffffff', // White text
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#6a0dad', // Purple background
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 8,
        marginVertical: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff', // White text
        marginBottom: 10,
    },
    arabic: {
        fontSize: 16,
        color: '#dcdcdc', // Light gray text
        marginBottom: 5,
    },
    transliteration: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#ffffff', // White text
        marginBottom: 5,
    },
    translation: {
        fontSize: 14,
        color: '#ffffff', // White text
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UmrahDuaScreen;
