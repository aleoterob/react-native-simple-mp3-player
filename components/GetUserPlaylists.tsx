import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";

interface AudioPlayerProps {
  filePath: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ filePath }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const loadSound = async () => {
    console.log("Loading sound:", filePath);
    const { sound } = await Audio.Sound.createAsync({ uri: filePath });
    setSound(sound);
    console.log("Sound loaded:", sound);
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        console.log("Pausing sound");
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log("Playing sound");
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      await loadSound();
      console.log("Playing sound after loading");
      await sound?.playAsync();
      setIsPlaying(true);
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
    <View style={styles.container}>
      <Text style={styles.title}>Reproductor de Audio</Text>
      <Button
        title={isPlaying ? "Detener Audio" : "Reproducir Audio"}
        onPress={togglePlayPause}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default AudioPlayer;
