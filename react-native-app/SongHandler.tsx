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
export const URL_SEARCH = "http://192.168.1.5:3000/song/getSearchSongs";
export const URL_GENRE = "http://192.168.1.:3000/song/getGenreSongs";

export const getSongs = async (setSongs: React.Dispatch<React.SetStateAction<Song[]>>) => {
    try {
      const response = await axios.get<Song[]>(`${URL_SONG}`);
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
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

export const getSearchSongs = async (setSongs: React.Dispatch<React.SetStateAction<Song[]>>, query: string) => {
    try {
        const response = await axios.get<Song[]>(`${URL_SEARCH}?query=${encodeURIComponent(query)}`);
        setSongs(response.data);
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
};

export const getGenreSongs = async (setSongs: React.Dispatch<React.SetStateAction<Song[]>>, genre: string) => {
    try {
        const response = await axios.get<Song[]>(`${URL_GENRE}?query=${encodeURIComponent(genre)}`);
        setSongs(response.data);
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
};
  