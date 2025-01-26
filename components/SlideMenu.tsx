import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  PanResponder,
} from "react-native";

const { width } = Dimensions.get("window");

const SlideMenu = ({ visible, onClose }) => {
  const [animation] = useState(new Animated.Value(-width));

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 0) {
          animation.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.timing(animation, {
            toValue: -width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => onClose());
        } else {
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={[styles.menu, { transform: [{ translateX: animation }] }]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.menuText}>¡Este es el menú deslizable!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuText: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 20,
  },
});

export default SlideMenu;
