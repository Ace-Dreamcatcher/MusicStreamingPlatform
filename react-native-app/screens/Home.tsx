import { TouchableOpacity, Button, Pressable, ScrollView, StyleSheet, Image, useColorScheme } from 'react-native';
import { Text, View } from '../components/Theme';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
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
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);
    const [songs, setSongs] = useState<Song[]>([]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [likedSongs, setLikedSongs] = useState<string[]>([]);

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

    const playSong = async (songPath: string) => {
        // Implement your playSong function
    };

    const toggleLike = (index: number) => {
        const newLikedSongs = [...likedSongs];
        if (newLikedSongs.includes(songs[index].name)) {
            newLikedSongs.splice(newLikedSongs.indexOf(songs[index].name), 1);
        } else {
            newLikedSongs.push(songs[index].name);
        }
        setLikedSongs(newLikedSongs);
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Songs</Text>
            <Button onPress={fetchSongs} title='Fetch Songs' />
            <ScrollView>
                {songs.map((song, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.songContainer} 
                        onPress={() => playSong('../assets/Songs/Hey_Gringo.mp3')}
                    >
                        <View style={styles.songInnerContainer}>
                            <Image
                                source={{ uri: song.albums.image }}
                                style={styles.albumImage}
                                onError={() => console.log('Error loading image')} 
                                defaultSource={require('../assets/Songs/Toothless.png')} 
                                resizeMode="cover"
                            />
                            <View style={styles.songInfo}>
                                <Text style={styles.songTitle}>{song.name}</Text>
                                <Text style={styles.artist}>{song.artists.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => toggleLike(index)}>
                                <FontAwesome
                                    name={likedSongs.includes(song.name) ? 'heart' : 'heart-o'}
                                    size={28}
                                    color={likedSongs.includes(song.name) ? '#19bfb7' : '#19bfb7'}
                                />
                            </TouchableOpacity>
                        </View>
                        
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const getStyles = (colorScheme: string | null | undefined) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
        },
        heading: {
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 5,
        },
        songContainer: {
            marginBottom: 5,
            marginEnd: 10,
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === 'light' ? '#f5f5f5' : '#202123',
        },
        songInnerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 5,

        },
        songTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        albumImage: {
            width: 65,
            height: 65,
            resizeMode: 'cover',
            marginRight: 10,
        },
        songInfo: {
            flex: 1,  
            marginTop: 7,
        },
        artist: {
            fontSize: 14,
            fontWeight: '200',
        },
    })
}
