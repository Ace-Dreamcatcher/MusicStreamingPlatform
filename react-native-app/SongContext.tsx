import axios from "axios";
import { Audio } from "expo-av";
import React, { createContext, useContext, useState } from "react";

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

interface SongsProps {
    contextSongsHome?: {songs: Song[]};
    contextSongsLibrary?: {songs: Song[]}
    soundState?: {sound: Audio.Sound | null};
    isPlaying?: {play: boolean};
    onCurrentSong?: {currentSong: Song | null};
    onGetSongs?: (setSongs: React.Dispatch<React.SetStateAction<Song[]>>) => Promise<any>;
    onGetSearchSongs?: (setSongs: React.Dispatch<React.SetStateAction<Song[]>>, query: string) => Promise<any>;
    onGetGenreSongs?: (setSongs: React.Dispatch<React.SetStateAction<Song[]>>, genre: string) => Promise<any>;
    onPlay?: (songPath: string) => Promise<any>;
    onPressSong?: (song: Song, screen: string) => Promise<any>;
    onTogglePlay?: () => Promise<any>;
    onPreviousButton?: () => Promise<any>;
    onNextButton?: () => Promise<any>;
}

export const URL_SONG = "http://192.168.1.5:3000/song/getSongs";
export const URL_SEARCH = "http://192.168.1.5:3000/song/getSearchSongs";
export const URL_GENRE = "http://192.168.1.5:3000/song/getGenreSongs";

const SongContext = createContext<SongsProps>({});
export const useSong = () => {
    return useContext(SongContext);
};

export const SongProvider = ({ children }: any) => {
    const [contextSongsHome, setContextSongsHome] = useState<{
        songs: Song[];
    }>({
        songs: [],
    });
    const [contextSongsLibrary, setContextSongsLibrary] = useState<{
        songs: Song[];
    }>({
        songs: [],
    });
    const [screen, setScreen] = useState<{
        screen: string;
    }>({
        screen: "Home",
    });
    const [soundState, setSoundState] = useState<{
        sound: Audio.Sound | null;
    }>({
        sound: null,
    });
    const [onCurrentSong, setOnCurrentSong] = useState<{
        currentSong: Song | null;
    }>({
        currentSong: null,
    });
    const [isPlaying, setIsPlaying] = useState<{
        play: boolean;
    }>({
        play: false,
    });

    const getSongs = async (setSongs: React.Dispatch<React.SetStateAction<Song[]>>) => {
        try {
          const response = await axios.get<Song[]>(`${URL_SONG}`);

          setContextSongsHome({
            songs: response.data,
          });

          setSongs(response.data);
        } catch (error) {
          console.error("Error fetching songs:", error);
        }
    };

    const getSearchSongs = async (setSongs: React.Dispatch<React.SetStateAction<Song[]>>, query: string) => {
        try {
            const response = await axios.get<Song[]>(`${URL_SEARCH}?query=${encodeURIComponent(query)}`);

            setSongs(response.data);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    const getGenreSongs = async (setSongs: React.Dispatch<React.SetStateAction<Song[]>>, genre: string) => {
        try {
            const response = await axios.get<Song[]>(`${URL_GENRE}?query=${encodeURIComponent(genre)}`);

            setSongs(response.data);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    const playSong = async (songPath: string) => {
        if (soundState.sound) {
            await soundState.sound.unloadAsync();
        }
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: `http://192.168.1.5:3000/media/${songPath}` },
                { shouldPlay: true },
            );
            setSoundState({
                sound: newSound,
            });
        } catch (error) {
            console.error("Error playing song:", error);
        }
    };

    const handlePlaySong = async (song: Song, screen: string) => {
        if (onCurrentSong.currentSong === null || onCurrentSong.currentSong.name !== song.name || onCurrentSong.currentSong.name === song.name) {
            setOnCurrentSong({
                currentSong: song,
            });
            
            await playSong(song.track);

            setIsPlaying({
                play: true,
            });

            setScreen({
                screen: screen,
            });
        } else {
            setIsPlaying({
                play: false,
            });
        }
    };

    const handleTogglePlay = async () => {
        if (!onCurrentSong?.currentSong) return;
    
        if (soundState?.sound) {
            if (isPlaying?.play) {
            await soundState?.sound.pauseAsync();

            setIsPlaying({
                play: false,
            }); 
            } else {
            await soundState?.sound.playAsync();

            setIsPlaying({
                play: true,
            }); 
            }
        }
    };

    const handlePreviousSong = async () => {
        if (onCurrentSong.currentSong !== null) {
            if (screen.screen === "Home") {
                const currentIndex = contextSongsHome.songs.findIndex(song => song.name === onCurrentSong.currentSong.name);
                const previousIndex = (currentIndex - 1 + contextSongsHome.songs.length) % contextSongsHome.songs.length;
                const previousSong = contextSongsHome.songs[previousIndex];

                setOnCurrentSong({
                    currentSong: previousSong,
                });
    
                await playSong(previousSong.track);
                setIsPlaying({
                    play: true,
                });
            } else if (screen.screen === "Library") {
                const currentIndex = contextSongsLibrary.songs.findIndex(song => song.name === onCurrentSong.currentSong.name);
                const previousIndex = (currentIndex - 1 + contextSongsLibrary.songs.length) % contextSongsLibrary.songs.length;
                const previousSong = contextSongsLibrary.songs[previousIndex];

                setOnCurrentSong({
                    currentSong: previousSong,
                });
    
                await playSong(previousSong.track);
                setIsPlaying({
                    play: true,
                });
            }
        } else {
            setIsPlaying({
                play: false,
            });
        }
    };

    const handleNextSong = async () => {
        if (onCurrentSong.currentSong !== null) {
            if (screen.screen === "Home") {
                const currentIndex = contextSongsHome.songs.findIndex(song => song.name === onCurrentSong.currentSong.name);
                const nextIndex = (currentIndex + 1) % contextSongsHome.songs.length;
                const nextSong = contextSongsHome.songs[nextIndex];

                setOnCurrentSong({
                    currentSong: nextSong,
                });

                await playSong(nextSong.track);
                setIsPlaying({
                    play: true,
                });
            } else if (screen.screen === "Library") {
                const currentIndex = contextSongsLibrary.songs.findIndex(song => song.name === onCurrentSong.currentSong.name);
                const nextIndex = (currentIndex + 1) % contextSongsLibrary.songs.length;
                const nextSong = contextSongsLibrary.songs[nextIndex];

                setOnCurrentSong({
                    currentSong: nextSong,
                });

                await playSong(nextSong.track);
                setIsPlaying({
                    play: true,
                });
            }
        } else {
            setIsPlaying({
                play: true,
            });
        }
    };

    const value = {
        onGetSongs: getSongs,
        onGetSearchSongs: getSearchSongs,
        onGetGenreSongs: getGenreSongs,
        onPlay: playSong,
        onPressSong: handlePlaySong,
        onTogglePlay: handleTogglePlay,
        onPreviousButton: handlePreviousSong,
        onNextButton: handleNextSong,
        soundState,
        onCurrentSong,
        isPlaying,
    };
    
    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
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