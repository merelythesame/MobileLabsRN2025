import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ClickableObject from '../components/ClickableObject';

export default function GameScreen({ navigation }) {
    const [score, setScore] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.score}>Score: {score}</Text>
            <ClickableObject onScore={(points) => setScore(prev => prev + points)} />
            <Button title="Go to Tasks" onPress={() => navigation.navigate('Tasks')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    score: { fontSize: 32, marginBottom: 20 },
});
