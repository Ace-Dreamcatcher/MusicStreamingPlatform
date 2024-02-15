import { TouchableOpacity, Button, Pressable, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Theme';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';


interface Song {
    name: string;
    albums: {
        name: string;
        image: string;
    };
    artists: {
        name: string;
        image: string;
    };
}

export default function Home() {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const [songs, setSongs] = useState<Song[]>([]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.navigate('Account')}>
                    <FontAwesome name='user-circle-o' size={25} color='#19bfb7' style={{ marginRight: 27 }} />
                </Pressable>
            ),
        });
    }, [navigation]);

    const fetchSongs = async () => {
        try {
            const response = await axios.get<Song[]>('http://192.168.1.4:3000/song/songs');
            setSongs(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    // const songsData: { [key: string]: any } = {
    //     'Hey_Gringo.mp3': require('/Users/stavrostsoukalas/Documents/GitHub/MusicStreamingPlatform/react-native-app/assets/Songs/Hey_Gringo.mp3'),
    //     // Add other songs as needed
    // };
    
    
    const playSong = async (songPath: string) => {
        // try {
        //     const selectedSong = songsData[songPath]; // Use the dynamic songPath parameter
        //     const { sound } = await Audio.Sound.createAsync(selectedSong);
        //     setSound(sound);
        //     await sound.playAsync(); 
        // } catch (error) {
        //     console.error('Error playing song:', error);
        // }
        console.log(songPath);
    };
    
    

        return (
            <LinearGradient colors={["#f5f5f5", "#401641"]} style={{ flex: 1 }}>
                <SafeAreaView>
                    <Text style={styles.heading}>Songs</Text>
                    <Button onPress={fetchSongs} title='Fetch Songs' />
                    <ScrollView>
                        {songs.map((song, index) => (
                            <View key={index} style={styles.songContainer}>
                                <TouchableOpacity onPress={() => playSong('../assets/Songs/Hey_Gringo.mp3')}>
                                    <Image source={require('../assets/Songs/SurfaceSounds.jpeg')} style={styles.albumImage} />
                                </TouchableOpacity>
                                <View style={styles.songInfo}>
                                    <Text style={styles.songTitle}>{song.name}</Text>
                                    <Text>Album: {song.albums.name}</Text>
                                    <Text>Artist: {song.artists.name}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        heading: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        songContainer: {
            flexDirection: 'row',
            marginBottom: 10,
            padding: 10,

        },
        songTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        albumImage: {
            width: 100,
            height: 100,
            resizeMode: 'cover',
            marginRight: 10,
        },
        songInfo: {
            flex: 1,
            
        },
    });
    
    