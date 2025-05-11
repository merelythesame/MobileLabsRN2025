import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskItem({ task, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.description}>{task.description}</Text>
                <Text style={styles.date}>
                    {task.reminderDate.toLocaleString('uk-UA')}
                </Text>
            </View>
            <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        color: '#555',
        marginTop: 2,
    },
    date: {
        color: '#888',
        marginTop: 5,
        fontSize: 12,
    },
    deleteButton: {
        backgroundColor: '#E53935',
        padding: 8,
        borderRadius: 30,
        marginLeft: 10,
    },
});
