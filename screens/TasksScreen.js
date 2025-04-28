import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTasks } from '../components/TaskProvider';

export default function TasksScreen() {
    const { tasks } = useTasks();

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.completed ? '✅' : '❌'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
});
