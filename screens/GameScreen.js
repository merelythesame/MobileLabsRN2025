import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ClickableObject from '../components/ClickableObject';
import { useTasks } from '../components/TaskProvider';

const eventToTaskName = {
    tap10: "Зробити 10 кліків",
    doubleTap5: "5 подвійних кліків",
    longPress: "Утримати об'єкт 3 секунди",
    pan: "Перетягнути об'єкт",
    flingRight: "Свайп вправо",
    flingLeft: "Свайп вліво",
    score100: "Отримати 100 очок",
};

export default function GameScreen({ navigation }) {
    const { completeTask } = useTasks();
    const [score, setScore] = useState(0);

    const handleCompleteTask = (eventKey) => {
        const taskName = eventToTaskName[eventKey];
        if (taskName) {
            completeTask(taskName);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.score}>Score: {score}</Text>
            <ClickableObject
                onScore={(points) => setScore(prev => prev + points)}
                onCompleteTask={handleCompleteTask}
            />
            <Button title="Go to Tasks" onPress={() => navigation.navigate('Tasks')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    score: { fontSize: 32, marginBottom: 20 },
});
