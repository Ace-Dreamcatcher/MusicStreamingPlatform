import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity, ScrollView, StyleSheet, Image, useColorScheme, Dimensions, Animated } from "react-native";
import { Text, View } from "../components/Theme";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { FontAwesome,  } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { Song, getSongs, toggleLike } from "../SongHandler";
import { useSong } from "../SongContext";


export default function Home() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const [songs, setSongs] = useState<Song[]>([]);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); 
  const { onPlay, soundState } = useSong();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <FontAwesome
            name="user-circle-o"
            size={25}
            color="#19bfb7"
            style={{ marginRight: 27 }}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getSongs(setSongs);
  }, []);

  
  const handlePlaySong = async (song: Song) => {
    if (currentSong === null || currentSong.name !== song.name) {
      setCurrentSong(song);
      
      await onPlay!(song.track);
      setIsPlaying(true);
    } else {
      if (soundState?.sound) {
        if (isPlaying) {
          await soundState?.sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundState?.sound.playAsync();
          setIsPlaying(true); 
        }
      }
    }
  };
  const handleNextSong = async () => {
    if (!currentSong) return;

    const currentIndex = songs.findIndex(song => song.name === currentSong.name);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];

    setCurrentSong(nextSong);
    await onPlay!(nextSong.track);
    setIsPlaying(true); 
  };

  const handlePreviousSong = async () => {
    if (!currentSong) return;

    const currentIndex = songs.findIndex(song => song.name === currentSong.name);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    const previousSong = songs[previousIndex];

    setCurrentSong(previousSong);
    await onPlay!(previousSong.track);
    setIsPlaying(true); 
  };

  const handleTogglePlay = async () => {
    if (!currentSong) return;

    if (soundState?.sound) {
      if (isPlaying) {
        await soundState?.sound.pauseAsync();
        setIsPlaying(false); 
      } else {
        await soundState?.sound.playAsync();
        setIsPlaying(true); 
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Songs</Text>
      <ScrollView>
        {songs.map((song, index) => (
          <TouchableOpacity
            key={index}
            style={styles.songContainer}
            onPress={() => handlePlaySong(song)}
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
      {currentSong && (
        <View style={styles.musicPlayerContainer}>
          <TouchableOpacity style={styles.musicPlayer} onPress={() => navigation.navigate("Player", {currentSong})}>
            <Image
              source={{ uri: `http://192.168.1.5:3000/media/${currentSong.albums.image}` }}
              style={styles.musicPlayerImage}
              defaultSource={require("../assets/Songs/DefaultSongImage2.png")}
              resizeMode="cover"
            />
            <View style={styles.musicPlayerTextContainer}>
              <Text style={styles.musicPlayerText}>
                {currentSong.name}
              </Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity onPress={handlePreviousSong} style={styles.controlButton}>
                <Ionicons name="play-back" size={29} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleTogglePlay} style={styles.controlButton}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={31} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextSong} style={styles.controlButton}>
                <Ionicons name="play-forward" size={29} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
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
      marginBottom: 10,
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
      borderRadius: 15,
    },
    songInfo: {
      flex: 1,
      marginTop: 7,
    },
    artist: {
      fontSize: 14,
      fontWeight: "200",
    },
    musicPlayerContainer: {
      position: "absolute",
      bottom: 10,
      left: Dimensions.get("window").width / 4,
      right: Dimensions.get("window").width / 4,
      alignItems: "center",
    },
    musicPlayer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 20,
      paddingHorizontal: 15,
      backgroundColor: "#19bfb7", //colorScheme === "light" ? "#f5f5f5" : "#202123",
      width: Dimensions.get("window").width - 15,
      height: 60,
    },
    musicPlayerImage: {
      width: 45,
      height: 45,
      resizeMode: "cover",
      borderRadius: 10,
      marginLeft: -7,
    },
    musicPlayerTextContainer: {
      flex: 1,
      justifyContent: "center",
      marginHorizontal: 15,
      backgroundColor: "#19bfb7",
    },
    musicPlayerText: {
      fontSize: 16,
      fontWeight: "500",
      color: "black",
    },
    controls: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#19bfb7",
    },
    controlButton: {
      marginHorizontal: 6,
    },
  });
};
