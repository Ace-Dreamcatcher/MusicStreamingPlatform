import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, StatusBar, useColorScheme, Image, ScrollView, TouchableOpacity } from "react-native";
import { View, Text } from "../components/Theme";
import { Song, playSong, toggleLike } from "../SongHandler";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect, useState } from "react";
import { Audio } from "expo-av";

export default function Genre() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === "dark" ? "black" : "white";
    const statusBarStyle =
    colorScheme === "dark" ? "light-content" : "dark-content";
    const backButtonColor = colorScheme === "dark" ? "#202123" : "#f5f5f5";
    const styles = getStyles(colorScheme);
    const [songs, setSongs] = useState<Song[]>([]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [likedSongs, setLikedSongs] = useState<string[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 5,
                  backgroundColor: backButtonColor,
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#19bfb7" />
                <Text style={{ fontSize: 20, color: "#19bfb7" }}> Back</Text>
              </View>
            </TouchableOpacity>
          ),
        });
      }, [navigation, colorScheme]);

    return (
        <>
            <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
            <View style={styles.container}>
                <ScrollView>
                    {songs.map((song, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.songContainer}
                        onPress={() => playSong(song.track, sound, setSound)}
                    >
                        <View style={styles.songInnerContainer}>
                        <Image
                            source={{ uri: `http://192.168.1.5:3000/media/${song.albums.image}` }}
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
        </>
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
        width: 60,
        height: 60,
        resizeMode: "cover",
        marginRight: 10,
        borderRadius: 20,
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