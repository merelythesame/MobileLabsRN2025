import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TaskItem from '../components/TaskItem';
import { scheduleNotification, cancelNotification } from '../services/notificationService';

export default function HomeScreen() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');

    const handleAddTask = async () => {
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            reminderDate: date,
        };

        newTask.notificationId = await scheduleNotification(newTask);

        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
    };

    const handleDeleteTask = async (taskId) => {
        const task = tasks.find(t => t.id === taskId);

        if (task?.notificationId) {
            const result = await cancelNotification(task.notificationId);

            if (result) {
                if (result.success) {
                    Alert.alert('Успіх', 'Нагадування скасовано успішно.');
                } else {
                    Alert.alert('Помилка', 'Не вдалося скасувати нагадування.');
                }
            }

            setTasks(tasks.filter(t => t.id !== taskId));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📝 To-Do Reminder</Text>

            <TextInput
                placeholder="Назва"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Опис"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <Button
                title="Обрати дату та час"
                onPress={() => {
                    setPickerMode('date');
                    setShowPicker(true);
                }}
            />
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode={pickerMode}
                    display="default"
                    onChange={(event, selected) => {
                        if (event?.type === 'set' && selected) {
                            if (pickerMode === 'date') {
                                const newDate = new Date(date);
                                newDate.setFullYear(selected.getFullYear());
                                newDate.setMonth(selected.getMonth());
                                newDate.setDate(selected.getDate());

                                setDate(newDate);
                                setPickerMode('time');
                                setShowPicker(true);
                            } else if (pickerMode === 'time') {
                                const newDate = new Date(date);
                                newDate.setHours(selected.getHours());
                                newDate.setMinutes(selected.getMinutes());
                                newDate.setSeconds(0);

                                setDate(newDate);
                                setShowPicker(false);
                            }
                        } else {
                            setShowPicker(false);
                        }
                    }}
                />
            )}

            <Text style={styles.selectedDate}>
                Обрано: {date.toLocaleString('uk-UA')}
            </Text>

            <Button title="ДОДАТИ НАГАДУВАННЯ" onPress={handleAddTask} color="#1976D2" />

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} onDelete={handleDeleteTask} />
                )}
                style={{ marginTop: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    selectedDate: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#555',
    },
});
