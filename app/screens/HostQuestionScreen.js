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

export default function HostQuestionScreen() {
    const [isPlaying] = useState(true);
    const obj = "Towel";
    const count = 3;
    return (
        <View style={styles.background}>
            <View style={styles.timer}>
                <CountdownCircleTimer
                    size={70}
                    isPlaying={isPlaying}
                    duration={60}
                    colors={[
                        ["#00FF00", 0.83],
                        ["#FF8C00", 0.17],
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

            <Text style={styles.title}>Scavenger Object</Text>
            <Text style={styles.objectName}>{obj}</Text>
            <Text style={styles.tSubmissions}>Total Submissions</Text>
            <Text style={styles.count}>{count}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      color: colours.yellow,
    },
    score: {
      justifyContent: "space-between",
      backgroundColor: colours.yellow,
      height: "7%",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
    },
    background: {
      backgroundColor: colours.red,
      flex: 1,
      borderWidth: 1,
      display: "flex",
  
      paddingTop: 50,
    },
    timer: {
      height: "7%",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      padding: 10,
    },
    title: {
        marginTop: 150,
        fontSize: 28,
        color: colours.yellow,
        textAlign: 'center'
    },
    objectName: {
        marginTop: 40,
        fontSize: 35,
        color: colours.white,
        textAlign: 'center'
    },
    tSubmissions: {
        marginTop: 90,
        fontSize: 28,
        color: colours.white,
        textAlign: 'center'
    },
    count: {
        marginTop: 20,
        fontSize: 28,
        color: colours.yellow,
        textAlign: 'center'
    }
  });