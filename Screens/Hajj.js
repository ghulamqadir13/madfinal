import { View, Text,StyleSheet ,FlatList} from 'react-native'

import React, { useEffect } from "react";
import { useState } from "react";
import app from "./Firebase"; // Import the functions you need from the SDKs you need
import { getDatabase,ref,onValue } from "firebase/database";

const HajjScreen = () => {
    const [HajjDetails, setHajjDetails] = useState();
    useEffect(() => {
        const db = getDatabase(app);
        const dbref = ref(db, 'Hajj');
        // console.log("receiving data");
        onValue(dbref, (snapshot) => {
          let data = snapshot.val();
          setHajjDetails(data);
          // console.log(data);
        });
      }, []);
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.Description}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={HajjDetails}
          renderItem={renderItem}
          keyExtractor={item => item.step.toString()}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#fff',
    },
    itemContainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
      marginTop: 5,
    },
  });
  
  export default HajjScreen;