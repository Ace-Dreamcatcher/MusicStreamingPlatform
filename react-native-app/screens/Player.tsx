import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../components/Theme"; // Import Text from your Theme component

export default function Player({ route }) {
  const { currentSong } = route.params; // Get the currentSong parameter from navigation

  return (
    <LinearGradient colors={["#19bfb7", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.songInfoContainer}>
          <Image
            source={{ uri: `http://192.168.1.4:3000/media/${currentSong.albums.image}` }}
            style={styles.albumImage}
            defaultSource={require("../assets/Songs/DefaultSongImage2.png")}
            resizeMode="cover"
          />
          <Text style={styles.songTitle}>{currentSong.name}</Text>
        </View>
        {/* Additional Player Controls or UI Elements */}
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
  songInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  albumImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  // Additional styles as per your requirements
});
