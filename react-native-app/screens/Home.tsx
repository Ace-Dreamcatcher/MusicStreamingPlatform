import { Button, Pressable, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Theme';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { useLayoutEffect, useState } from 'react';

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
            // response.data.forEach(song => {
            //     console.log(song.albums.image);
            // });
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Songs</Text>
            <Button onPress={fetchSongs} title='Fetch Songs' />
            <ScrollView>
                {songs.map((song, index) => (
                    <View key={index} style={styles.songContainer}>
                        <Text style={styles.songTitle}>{song.name}</Text>
                        <Text>Album: {song.albums.name}</Text>
                        <Text>Artist: {song.artists.name}</Text>
                        <Image source={{ uri: song.albums.image }} style={styles.albumImage} />
                        <Image source={{ uri: song.artists.image }} style={styles.albumImage} />
                    </View>
                ))}
            </ScrollView>

        </View>
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
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
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
    },
});
