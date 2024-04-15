import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

const Loader = ({ visible = false }) => {
    //const [width, height] = useWindowDimensions();
    return (
        visible && (
            <View style={styles.container}>
                <View style={styles.loader}>
                    <BarIndicator color='blue' count={5}/>
                    <Text style={styles.text}>Please Wait...</Text>
                </View>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    loader: {
        height: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 50,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    }
});
export default Loader;