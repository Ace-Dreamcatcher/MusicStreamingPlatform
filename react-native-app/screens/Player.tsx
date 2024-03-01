import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../components/Theme"; 
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useSong } from '../SongContext';


export default function Player() {
  const { onCurrentSong, onTogglePlay, onPreviousButton, onNextButton, isPlaying } = useSong();
  
  return (
    <LinearGradient colors={["#19bfb7", "black"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.removeIconContainer}>
          <Octicons name="dash" size={60} color="#3b3b3b" />
        </View>
        <View style={styles.imageContainer}>
          {onCurrentSong?.currentSong ?
            <Image
              source={{ uri: `http://192.168.1.5:3000/media/${onCurrentSong?.currentSong.albums.image}` }}
              style={styles.albumImage}
              defaultSource={require("../assets/Songs/DefaultSongImage2.png")}
              resizeMode="cover"
            /> :
            <Image
              source={require("../assets/Songs/DefaultSongImage2.png")}
              style={styles.albumImage}
              resizeMode="cover"
            />
          }
        </View>
        <View style={styles.songInfoContainer}>
          {onCurrentSong?.currentSong ?
            <>
              <Text style={styles.songTitle}>{onCurrentSong?.currentSong.name}</Text>
              <Text style={styles.songArtist}>{onCurrentSong?.currentSong.artists.name}</Text> 
            </> :
            <Text style={styles.songTitle}>Not playing</Text>
          }
        </View>
        <View style={styles.controls}>
          <View style={styles.progressBar}>
            <Text style={styles.progressBarText}>ProgressBar</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => onPreviousButton!()} style={styles.controlButton}>
              <Ionicons name="play-back" size={50} color={"white"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onTogglePlay!()} style={styles.controlButton}>
              <Ionicons name={isPlaying?.play ? "pause" : "play"} size={50} color={"white"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNextButton!()} style={styles.controlButton}>
              <Ionicons name="play-forward" size={50} color={"white"}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  removeIconContainer: {
      marginTop: Dimensions.get("window").width - 355,
  },
  imageContainer: {
    alignItems: 'center',
  },
  albumImage: {
    width: Dimensions.get("window").width - 80,
    height: Dimensions.get("window").width - 80,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  songInfoContainer: {
    marginTop: 20, 
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 20,
    fontWeight: "200",
    color: 'white',
    textAlign: 'center',
  },
  controls:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    alignItems: 'center',
  },
  progressBarText: {
    fontSize: 18,
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 0,
  },
  controlButton: {
      margin: 30,
  },
});
  