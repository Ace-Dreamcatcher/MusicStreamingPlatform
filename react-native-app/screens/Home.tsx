import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  useColorScheme,
} from "react-native";
import { Text, View } from "../components/Theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Audio } from "expo-av";
import { Song, getSongs, playSong, toggleLike } from "../SongHandler";


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
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <FontAwesome
            name="user-circle-o"
            size={25}
            color="#19bfb7"
            style={{ marginRight: 27 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getSongs(setSongs);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Songs</Text>
      <ScrollView>
        {songs.map((song, index) => (
          <TouchableOpacity
            key={index}
            style={styles.songContainer}
            onPress={() => playSong(song.track, sound, setSound)}
          >
            <View style={styles.songInnerContainer}>
              <Image
                source={{ uri: song.albums.image }}
                style={styles.albumImage}
                defaultSource={require("../assets/Songs/DefaultSongImage2.png")}
                resizeMode="cover"
              />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.name}</Text>
                <Text style={styles.artist}>{song.artists.name}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleLike(index, songs, likedSongs, setLikedSongs)}>
                <FontAwesome
                  name={likedSongs.includes(song.name) ? "heart" : "heart-o"}
                  size={28}
                  color={likedSongs.includes(song.name) ? "#19bfb7" : "grey"}
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
      fontWeight: "bold",
      marginLeft: 5,
    },
    songContainer: {
      marginBottom: 5,
      marginEnd: 10,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === "light" ? "#f5f5f5" : "#202123",
    },
    songInnerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 5,
    },
    songTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    albumImage: {
      width: 65,
      height: 65,
      resizeMode: "cover",
      marginRight: 10,
    },
    songInfo: {
      flex: 1,
      marginTop: 7,
    },
    artist: {
      fontSize: 14,
      fontWeight: "200",
    },
  });
};
