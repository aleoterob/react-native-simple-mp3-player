import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Audio } from "expo-av";
import tw from "twrnc";
import { useAudio } from "./AudioContext";

interface AudioPlayerProps {
  filePath: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ filePath }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { playSound, stopSound, resetSounds, registerSound } = useAudio();

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: filePath });
    setSound(sound);
    registerSound(sound);
    return sound;
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await stopSound(sound);
      setIsPlaying(false);
    } else {
      await resetSounds(sound);
      if (sound) {
        await playSound(sound, setIsPlaying);
      } else {
        const newSound = await loadSound();
        await playSound(newSound, setIsPlaying);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-200 p-5`}>
      <Text style={tw`text-xl font-bold mb-5`}>Reproductor de Audio</Text>
      <Button
        title={isPlaying ? "Detener Audio" : "Reproducir Audio"}
        onPress={togglePlayPause}
      />
    </View>
  );
};

export default AudioPlayer;
