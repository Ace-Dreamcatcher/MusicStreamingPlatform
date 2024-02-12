import { Animated, Dimensions, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { View } from '../components/Theme';
import { Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function Search() {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const widthAnimation = useRef(new Animated.Value(Dimensions.get('window').width)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(widthAnimation, {
          toValue: Dimensions.get('window').width - 70,
          duration: 200,
          useNativeDriver: false,
        }).start();
    };

    const handleOutofFocus = () => {
        setIsFocused(false);
        Animated.timing(widthAnimation, {
          toValue: Dimensions.get('window').width,
          duration: 200,
          useNativeDriver: false,
        }).start();
    };

    const handleCancel = () => {
        setIsFocused(false);
        setSearchQuery('');
        inputRef.current?.blur();
    };

    const handleSearch = () => {
        console.log('Search text:', searchQuery);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.secondContainer, { width: widthAnimation }]}>
                <View style={styles.searchContainer}>
                    <Ionicons name='search' size={24} color='gray' style={styles.icon} />
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder='Artists, Albums, Songs'
                        placeholderTextColor='gray'
                        onChangeText={setSearchQuery}
                        onFocus={handleFocus}
                        onBlur={handleOutofFocus}
                        onSubmitEditing={handleSearch}
                        value={searchQuery}
                    />
                </View>
                {isFocused && (
                    <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
            <View style={styles.browseContainer}>
                <Text style={styles.header}>Browse</Text>
                <View style={styles.buttonFlex}>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={styles.buttonText}>Rock</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText}>Hip-Hop</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonFlex}>
                    <TouchableOpacity style={styles.button3}>
                        <Text style={styles.buttonText}>Metal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button4}>
                        <Text style={styles.buttonText}>Jazz</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonFlex}>
                    <TouchableOpacity style={styles.button5}>
                        <Text style={styles.buttonText}>Classic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button6}>
                        <Text style={styles.buttonText}>Blues</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonFlex}>
                    <TouchableOpacity style={styles.button7}>
                        <Text style={styles.buttonText}>Pop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button8}>
                        <Text style={styles.buttonText}>Country</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonFlex}>
                    <TouchableOpacity style={styles.button9}>
                        <Text style={styles.buttonText}>Top Hits</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const getStyles = (colorScheme: string | null | undefined) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        secondContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginVertical: 5,
            height: 45,
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            paddingHorizontal: 10,
            backgroundColor: colorScheme === 'light' ? '#e4e6eb' : '#404040',
            width: '100%',
            height: '100%',
        },
        input: {
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: colorScheme === 'light' ? 'black' : 'white',
        },
        icon: {
            marginRight: 10,
        },
        cancelButton: {
            marginLeft: 10,
        },
        cancelText: {
            fontSize: 18,
            color: '#19bfb7',
        },
        browseContainer: {
            marginBottom: 20,
        },
        header: {
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 50,
            marginBottom: 5,
            marginLeft: 5,
            color: colorScheme === 'light' ? 'black' : 'white',
        },
        buttonText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        buttonFlex: {
            flexDirection: 'row',
            marginBottom: 7,
        },
        button1: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#ea522c',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button2: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#5782ee',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button3: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#ec333c',
            alignSelf: 'stretch',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button4: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#059635',
            alignSelf: 'stretch',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button5: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#85429f',
            alignSelf: 'stretch',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button6: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#2a0f8c',
            alignSelf: 'stretch',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button7: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#f44d80',
            alignSelf: 'stretch',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button8: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#702906',
            alignSelf: 'stretch',
            width: (Dimensions.get('window').width / 2) - 10,
            height: 70,
            marginHorizontal: 5,
        },
        button9: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#e2ae03',
            alignSelf: 'stretch',
            width: Dimensions.get('window').width - 10,
            height: 70,
            marginHorizontal: 5,
        },
    })
}
