import axios from "axios";
import { Audio } from "expo-av";


export interface Song {
    name: string;
    track: string;
    albums: {
      name: string;
      image: string;
    };
    artists: {
      name: string;
      image: string;
    };
}

export const URL_SONG = "http://192.168.1.5:3000/song/getSongs";


export const getSongs = async (setSongs: React.Dispatch<React.SetStateAction<Song[]>>) => {
    try {
      const response = await axios.get<Song[]>(`${URL_SONG}`);
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
};


export const playSong = async (
    songPath: string,
    sound: Audio.Sound | null,
    setSound: React.Dispatch<React.SetStateAction<Audio.Sound | null>>
    ) => {
        if (sound) {
            await sound.unloadAsync();
        }
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: songPath },
                { shouldPlay: true },
            );
            setSound(newSound);
        } catch (error) {
            console.error("Error playing song:", error);
        }
    };


export const toggleLike = (
    index: number,
    songs: Song[],
    likedSongs: string[],
    setLikedSongs: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const newLikedSongs = [...likedSongs];
        if (newLikedSongs.includes(songs[index].name)) {
            newLikedSongs.splice(newLikedSongs.indexOf(songs[index].name), 1);
        } else {
            newLikedSongs.push(songs[index].name);
        }
        setLikedSongs(newLikedSongs);
    };


  