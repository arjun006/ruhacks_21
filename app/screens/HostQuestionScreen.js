import "react-native-gesture-handler";
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import GlobalStyles from "./../config/GlobalStyles";
import colours from "../config/colours";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import * as firebase from "firebase";

export default function HostQuestionScreen({ route, navigation }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentObject, setCurrentObject] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [submission, setSubmission] = useState(0);

    const { lobbyId, isHost } = route.params;
    const db = firebase.database();

    useEffect(() => {
        let dbRef = db.ref();

        //Get Data
        dbRef.child(`/${lobbyId}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                const { currentQuestion, totalQuestion, Question } = snapshot.val();

                const { object } = Question[currentQuestion];

                setQuestionIndex(currentQuestion);
                setCurrentObject(object);
                setTotalQuestion(totalQuestion);
            }
        }).catch((error) => {
            console.error(error);
        });

        let ref = db.ref(`${lobbyId}/Question/${questionIndex}`);

        ref.on('value', (snapshot) => {

            if (snapshot.exists()) {
                const { submission } = snapshot.val();

                setSubmission(submission);
            }
            else {
                console.log("No Data");
            }
        });
    }, []);

    const onQuestionComplete = () => {
        let dbRef = db.ref(`${lobbyId}/`);

        //Increment questionIndex
        dbRef.update({
            currentQuestion: questionIndex + 1
        });

        navigation.push('LeaderBoardScreen', {
            lobbyId,
            isHost,
            isGameComplete: questionIndex + 1 >= totalQuestion
        });
    };

    return (
        <View style={styles.background}>
            <View style={styles.timer}>
                <CountdownCircleTimer
                    size={70}
                    isPlaying={isPlaying}
                    duration={5}
                    colors={[
                        ["#00FF00", 0.83],
                        ["#FF8C00", 0.17],
                    ]}
                    onComplete={onQuestionComplete}
                >
                    {({ remainingTime, animatedColor }) => (
                        <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
                            {remainingTime}
                        </Animated.Text>
                    )}
                </CountdownCircleTimer>
            </View>

            <Text style={styles.title}>Scavenger Object</Text>
            <Text style={styles.objectName}>{currentObject}</Text>
            <Text style={styles.tSubmissions}>Total Submissions</Text>
            <Text style={styles.count}>{submission}</Text>
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