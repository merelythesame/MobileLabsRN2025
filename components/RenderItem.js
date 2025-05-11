import React, { useState } from 'react';
import {Alert, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text, View, Modal} from 'react-native';
import * as FileSystem from 'expo-file-system';
import FileInfo from './FileInfo';

export default function RenderItem({ item, navigateTo, readDirectory, currentPath }) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = (item) => {
        Alert.alert(
            'Підтвердження видалення',
            `Ви впевнені, що хочете видалити ${item.isDirectory ? 'папку' : 'файл'} ${item.name}?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await FileSystem.deleteAsync(item.path, { idempotent: true });
                            readDirectory(currentPath);
                        } catch (error) {
                            Alert.alert('Помилка видалення', error.message);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View>
            <TouchableOpacity style={styles.item} onPress={() => navigateTo(item)}>
                <Text style={{ fontWeight: item.isDirectory ? 'bold' : 'normal' }}>{item.name}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoButton}>
                    <Text style={styles.infoText}>Інформація</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Видалити</Text>
                </TouchableOpacity>
            </TouchableOpacity>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View>
                                <FileInfo filePath={item.path} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    infoButton: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    deleteButton: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    infoText: {
        color: 'blue',
        fontSize: 14,
    },
    deleteText: {
        color: 'red',
        fontSize: 14,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
