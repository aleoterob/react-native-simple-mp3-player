import React from "react";
import { View } from "react-native";
import AudioPlayer from "../../components/AudioPlayer";
import { AudioProvider } from "../../components/AudioContext";
import tw from "twrnc";

const audioFiles = [
  require("../../assets/audio/01 - Debaser.mp3"),
  require("../../assets/audio/02 - Tame.mp3"),
  // Agrega más archivos aquí según sea necesario
];

const App = () => {
  return (
    <AudioProvider>
      <View style={tw`flex-1 justify-center items-center bg-gray-200`}>
        {audioFiles.map((filePath, index) => (
          <AudioPlayer key={index} filePath={filePath} />
        ))}
      </View>
    </AudioProvider>
  );
};

export default App;
