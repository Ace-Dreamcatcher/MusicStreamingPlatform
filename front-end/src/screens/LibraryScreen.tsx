import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, SafeAreaView, StatusBar } from 'react-native'
import Ionicons from 'react-native-ionicons'

export const LibraryScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView style={styles.navigation}>
                <Text> Navigation </Text>
            </SafeAreaView>
            <View style={styles.body}>
                <Text> Library Screen </Text>
            </View>
            <View style={styles.footer}>
                <Ionicons name="heart-outline" size={30} />
                <Text> Footer </Text>
            </View>
        </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#fff'
    },
    navigation: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    body: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    }
})