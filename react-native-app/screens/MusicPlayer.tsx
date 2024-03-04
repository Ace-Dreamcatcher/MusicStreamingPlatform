import { StyleSheet, Dimensions, Image, TouchableOpacity, useColorScheme } from "react-native";
import { View, Text } from "../components/Theme";
import { Ionicons } from '@expo/vector-icons';
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSong } from "../SongContext";

export default function MusicPlayer() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);
    const { onCurrentSong, onTogglePlay, isPlaying, onPreviousButton, onNextButton } = useSong();
    
    return (
        <View style={styles.musicPlayerContainer}>
            <TouchableOpacity style={styles.musicPlayer} onPress={() => navigation.navigate("Player")} activeOpacity={0.7}>
                {onCurrentSong?.currentSong ?
                    <Image
                        source={{ uri: `http://192.168.1.2:3000/media/${onCurrentSong?.currentSong.albums.image}` }}
                        style={styles.musicPlayerImage}
                        defaultSource={require("../assets/Songs/DefaultSongImage2.png")}
                        resizeMode="cover"
                    /> :
                    <Image
                        source={require("../assets/Songs/DefaultSongImage2.png")}
                        style={styles.musicPlayerImage}
                        resizeMode="cover"
                    />
                }
                <View style={styles.musicPlayerTextContainer}>
                    {onCurrentSong?.currentSong ?
                        <Text style={styles.musicPlayerText}>
                            {onCurrentSong?.currentSong.name}
                        </Text> :
                        <Text style={styles.musicPlayerText}>
                            Not playing
                        </Text>
                    }
                </View>
                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => onPreviousButton!()} style={styles.controlButton}>
                        <Ionicons name="play-back" size={29} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onTogglePlay!()} style={styles.controlButton}>
                        <Ionicons name={isPlaying?.play ? "pause" : "play"} size={31} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNextButton!()} style={styles.controlButton}>
                        <Ionicons name="play-forward" size={29} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const getStyles = (colorScheme: string | null | undefined) => {
    return StyleSheet.create({
        container: {
        flex: 1,
        padding: 5,
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
        borderRadius: 15,
        paddingHorizontal: 15,
        backgroundColor: "#19bfb7",
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
        fontWeight: '600',
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
