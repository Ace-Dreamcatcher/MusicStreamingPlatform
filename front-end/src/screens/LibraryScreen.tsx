import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, StatusBar } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export const LibraryScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView style={styles.topContainer}>
                <Text> Top bar </Text>
            </SafeAreaView>
            <View style={styles.mainContainer}>
                <Text> Library Screen </Text>
            </View>
            <View style={styles.bottomContainer}>
                <MaterialIcons name="my-library-music" size={24} color="black" />
                <Ionicons name="search" size={24} color="black" />
            </View>
        </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    mainContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderTopColor: 'black',
        borderTopWidth: 1,
        width: width,
        paddingVertical: 15,
        flexDirection: 'row'
    }
})
