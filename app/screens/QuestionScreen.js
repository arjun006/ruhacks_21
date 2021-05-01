import "react-native-gesture-handler";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import GlobalStyles from "./../config/GlobalStyles";
import colours from "../config/colours";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { Camera } from "expo-camera";

export default function QuestionScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [correct, setCorrect] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const cam = useRef();

  const takePicture = async () => {
    if (cam.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      let photo = await cam.current.takePictureAsync(options);
      const source = photo.uri;
      if (source) {
        cam.current.resumePreview();
        console.log(source);
      }
    }
    setCorrect((correct) => true);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.background}>
      <View style={styles.timer}>
        <CountdownCircleTimer
          size={70}
          isPlaying={isPlaying}
          duration={60}
          colors={[
            ["#004777", 0.4],
            ["#F7B801", 0.4],
            ["#A30000", 0.2],
          ]}
          onComplete={(prev) => !prev}
        >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={styles.new_background}>
        <Text style={GlobalStyles.title}>Take a Picture of</Text>
        <Text style={styles.subs}>Towel</Text>
        {!correct ? (
          <Camera
            ref={cam}
            style={{
              flex: 7,
              alignItems: "center",
              width: "80%",
              flexDirection: "row",
            }}
            type={type}
          >
            <View
              style={{
                padding: 20,
                flex: 1,
                height: "28%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></View>
          </Camera>
        ) : null}
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take a picture</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.score}>
        <Text style={styles.score_name}>John</Text>
        <Text style={styles.score_text}>500</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: colours.white,
  },
  cameraview: {
    flexDirection: "column",
    flex: 2,
  },
  text: {
    fontSize: 18,
    color: colours.yellow,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "10%",
    marginTop: 5,
  },
  score: {
    justifyContent: "space-between",
    backgroundColor: colours.yellow,
    height: "7%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  score_text: {
    color: colours.black,
    textAlign: "right",
    marginRight: 12,
    marginBottom: 8,
  },
  score_name: {
    color: colours.black,
    textAlign: "left",
    marginLeft: 12,
    marginBottom: 8,
  },
  subs: {
    fontSize: 25,
    color: colours.white,
    margin: 3,
  },
  background: {
    backgroundColor: colours.red,
    flex: 1,
    borderWidth: 1,
    display: "flex",

    paddingTop: 50,
  },
  timer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    height: "10%",
    width: "100%",
    padding: 10,
  },
  new_background: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
});
