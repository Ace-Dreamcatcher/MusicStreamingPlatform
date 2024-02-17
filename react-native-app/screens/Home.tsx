import { TouchableOpacity, Button, Pressable, ScrollView, StyleSheet, Image } from 'react-native';
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
            const response = await axios.get<Song[]>('http://192.168.1.5:3000/song/songs');
            setSongs(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const playSong = async (songPath: string) => {
        // Implement your playSong function
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Songs</Text>
            <Button onPress={fetchSongs} title='Fetch Songs' />
            <ScrollView>
                {songs.map((song, index) => (
                    <View key={index} style={styles.songContainer}>
                        <TouchableOpacity onPress={() => playSong('../assets/Songs/Hey_Gringo.mp3')}>
                        <Image
                                source={{ uri: song.albums.image }}
                                style={styles.albumImage}
                                onError={() => console.log('Error loading image')} 
                                defaultSource={require('../assets/Songs/Toothless.png')} 
                                resizeMode="cover"
                            />

                        </TouchableOpacity>
                        <View style={styles.songInfo}>
                            <Text style={styles.songTitle}>{song.name}</Text>
                            <Text style={styles.artist}> {song.artists.name}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
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
        flexDirection: 'row',
        marginBottom: 10,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    albumImage: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        marginRight: 30,
    },
    songInfo: {
        flex: 1,  
        marginTop: 7,
    },
    artist: {
        fontSize: 14,
        fontWeight: '200',
    }
});
