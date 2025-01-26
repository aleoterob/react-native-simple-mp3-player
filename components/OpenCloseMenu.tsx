import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const OpenCloseMenu = ({ onPress, visible }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {visible ? "Cerrar Menú" : "Abrir Menú"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default OpenCloseMenu;
