import React, { createContext, useState, useContext, ReactNode } from "react";
import { Audio } from "expo-av";

interface AudioContextProps {
  sound: Audio.Sound | null;
  playSound: (
    newSound: Audio.Sound,
    setIsPlaying: (isPlaying: boolean) => void
  ) => Promise<void>;
  stopSound: (currentSound: Audio.Sound | null) => Promise<void>;
  resetSounds: (excludeSound?: Audio.Sound) => Promise<void>;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [setIsPlaying, setSetIsPlaying] = useState<
    ((isPlaying: boolean) => void) | null
  >(null);
  const [allSounds, setAllSounds] = useState<Audio.Sound[]>([]);

  const playSound = async (
    newSound: Audio.Sound,
    setNewIsPlaying: (isPlaying: boolean) => void
  ) => {
    await resetSounds(newSound);
    if (sound && sound !== newSound) {
      await sound.pauseAsync();
      if (setIsPlaying) {
        setIsPlaying(false);
      }
    }
    setSound(newSound);
    setSetIsPlaying(() => setNewIsPlaying);
    await newSound.playAsync();
    setNewIsPlaying(true);
  };

  const stopSound = async (currentSound: Audio.Sound | null) => {
    if (currentSound) {
      await currentSound.pauseAsync();
      if (setIsPlaying) {
        setIsPlaying(false);
      }
      if (sound === currentSound) {
        setSound(null);
        setSetIsPlaying(null);
      }
    }
  };

  const resetSounds = async (excludeSound?: Audio.Sound) => {
    for (const sound of allSounds) {
      if (sound && sound !== excludeSound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
      }
    }
  };

  const registerSound = (sound: Audio.Sound) => {
    setAllSounds((prevSounds) => [...prevSounds, sound]);
  };

  return (
    <AudioContext.Provider
      value={{ sound, playSound, stopSound, resetSounds, registerSound }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
