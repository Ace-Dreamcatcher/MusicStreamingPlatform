import { Audio } from "expo-av";
import React, { createContext, useContext, useState } from "react";

interface SongsProps {
    soundState?: {sound: Audio.Sound | null};
    onPlay?: (songPath: string) => Promise<any>;
}

const SongContext = createContext<SongsProps>({});
export const useSong = () => {
    return useContext(SongContext);
};

export const SongProvider = ({ children }: any) => {
    const [soundState, setSoundState] = useState<{
        sound: Audio.Sound | null;
    }>({
        sound: null,
    });

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

    const value = {
        onPlay: playSong,
        soundState,
    };
    
    return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};