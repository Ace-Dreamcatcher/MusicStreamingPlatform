import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../components/Theme"; 
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSong } from '../SongContext';
import { Feather } from '@expo/vector-icons';

export default function Player() {
  const { onCurrentSong, onTogglePlay, onPreviousButton, onNextButton, isPlaying, ToggleLoop, isLoop, durationMillis, positionMillis } = useSong();
  const progress = durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 0;

  

  return (
    <LinearGradient colors={["#19bfb7", "black"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.removeIconContainer}>
          <Octicons name="dash" size={60} color="#3b3b3b" />
        </View>
        <View style={styles.imageContainer}>
          {onCurrentSong?.currentSong ?
            <Image
              source={{ uri: `http://192.168.1.2:3000/media/${onCurrentSong?.currentSong.albums.image}` }}
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
          <View style={styles.options}>
            <TouchableOpacity style={{marginHorizontal: 115}}>
              <FontAwesome name= {"heart-o"} size={30} color=  {"#757575"}/>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: 115}} onPress={ToggleLoop} activeOpacity={0.6}>
              <Feather name={"repeat"} size={27} color={isLoop?.loop? 'white' : '#757575'}  />
            </TouchableOpacity>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
          <View style={styles.timers}>
            <Text style={{marginHorizontal: 110, color: 'white'}}> {formatTime(positionMillis)} </Text> 
            <Text style={{marginHorizontal: 110, color: 'white'}}> {formatTime(durationMillis)} </Text>
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
  
const formatTime = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
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
    paddingBottom: 30
  },
  options:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  timers:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBar: {
    width: Dimensions.get("window").width - 80,
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
    marginBottom: 15,
  },
  progress: {
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  controlButton: {
    margin: 30,
  },
});
