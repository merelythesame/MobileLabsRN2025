import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function TextFileViewer({ filePath, onSave, onClose }) {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const fileContent = await FileSystem.readAsStringAsync(filePath);
                setContent(fileContent);
            } catch (error) {
                console.error("Помилка читання файлу:", error);
            }
        };

        fetchFileContent();
    }, [filePath]);

    const handleSave = () => {
        onSave(filePath, content);
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>Edit File</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    value={content}
                    onChangeText={setContent}
                />
                <View style={styles.buttons}>
                    <Button title="Save" onPress={handleSave} />
                    <Button title="Close" onPress={onClose} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
