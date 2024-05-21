import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from './Firebase'; // Ensure you have your Firebase app configuration here

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
        const db = getDatabase(app);
        const dbref = ref(db, "umrah_duas");
        const unsubscribe = onValue(dbref, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const orderedData = orderedKeys.map(key => data[key]);
                setUmrahDuaDetails(orderedData);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up the subscription on unmount
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
        </View>
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
        marginTop: 50,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    arabic: {
        fontSize: 16,
        color: '#333',
    },
    transliteration: {
        fontSize: 14,
        color: '#666',
    },
    translation: {
        fontSize: 14,
        color: '#999',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UmrahDuaScreen;
