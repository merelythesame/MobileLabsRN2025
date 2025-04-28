import React, { useState } from 'react';
import { StyleSheet, Animated, Text } from 'react-native';
import {TapGestureHandler, LongPressGestureHandler, PanGestureHandler, FlingGestureHandler, PinchGestureHandler, Directions} from 'react-native-gesture-handler';

export default function ClickableObject({ onScore = () => {}, onCompleteTask = () => {} }) {
    const [scale, setScale] = useState(new Animated.Value(1));
    const [position, setPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

    const [tapCount, setTapCount] = useState(0);
    const [doubleTapCount, setDoubleTapCount] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    const handleTap = () => {
        const newCount = tapCount + 1;
        setTapCount(newCount);
        if (newCount >= 10) {
            onCompleteTask('tap10');
        }
        addScore(1);
    };

    const handleDoubleTap = () => {
        const newCount = doubleTapCount + 1;
        setDoubleTapCount(newCount);
        if (newCount >= 5) {
            onCompleteTask('doubleTap5');
        }
        addScore(2);
    };

    const handleLongPress = () => {
        onCompleteTask('longPress');
        addScore(5);
    };

    const handleFling = (direction) => {
        if (direction === 'right') {
            onCompleteTask('flingRight');
        } else if (direction === 'left') {
            onCompleteTask('flingLeft');
        }
        const points = Math.floor(Math.random() * 10) + 1;
        addScore(points);
    };

    const handlePan = Animated.event(
        [{ nativeEvent: { translationX: position.x, translationY: position.y } }],
        { useNativeDriver: false }
    );

    const handlePinch = Animated.event(
        [{ nativeEvent: { scale: scale } }],
        { useNativeDriver: false }
    );

    const addScore = (points) => {
        const newScore = totalScore + points;
        setTotalScore(newScore);
        onScore(points);
        if (newScore >= 100) {
            onCompleteTask('score100');
        }
    };

    return (
        <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={() => onCompleteTask('pan')}>
            <PinchGestureHandler onGestureEvent={handlePinch}>
                <FlingGestureHandler direction={Directions.RIGHT} onActivated={() => handleFling('right')}>
                    <FlingGestureHandler direction={Directions.LEFT} onActivated={() => handleFling('left')}>
                        <LongPressGestureHandler onActivated={handleLongPress} minDurationMs={3000}>
                            <TapGestureHandler numberOfTaps={2} onActivated={handleDoubleTap}>
                                <TapGestureHandler numberOfTaps={1} onActivated={handleTap}>
                                    <Animated.View style={[styles.circle, {
                                        transform: [
                                            { translateX: position.x },
                                            { translateY: position.y },
                                            { scale: scale },
                                        ]
                                    }]}>
                                        <Text style={styles.title}>
                                            Play with me
                                        </Text>
                                    </Animated.View>
                                </TapGestureHandler>
                            </TapGestureHandler>
                        </LongPressGestureHandler>
                    </FlingGestureHandler>
                </FlingGestureHandler>
            </PinchGestureHandler>
        </PanGestureHandler>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
    }
});
