import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../components/Theme"; 
import { Ionicons } from '@expo/vector-icons';


export default function Player({ route }: any) {
    const { currentSong } = route.params; 
  
    return (
      <LinearGradient colors={["#19bfb7", "black"]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `http://192.168.1.5:3000/media/${currentSong.albums.image}` }}
              style={styles.albumImage}
              defaultSource={require("../assets/Songs/DefaultSongImage2.png")}
              resizeMode="cover"
            />
          </View>
          <View style={styles.songInfoContainer}>
            <Text style={styles.songTitle}>{currentSong.name}</Text>
            <Text style={styles.songArtist}>{currentSong.artists.name}</Text>
          </View>
          <View style={styles.controls}>
            <View style={styles.progressBar}>
              <Text style={styles.progressBarText}>ProgressBar</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="play-back" size={50} color={"white"}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name= "play" size={50} color={"white"}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="play-forward" size={50} color={"white"}/>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: 50, 
    },
    albumImage: {
      width: 250,
      height: 250,
      resizeMode: 'cover',
      borderRadius: 15,
    },
    songInfoContainer: {
      marginTop: 30, 
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
  