import React, { useState, useEffect } from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet} from 'react-native';

export default function CreateItem({ visible, type, onCreate, onCancel }) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (visible) {
            setName('');
            setContent('');
        }
    }, [visible]);

    const handleSubmit = () => {
        onCreate(type, name, content);
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Створити {type === 'folder' ? 'папку' : 'файл'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Назва"
                        value={name}
                        onChangeText={setName}
                    />
                    {type === 'file' && (
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Вміст файлу"
                            value={content}
                            onChangeText={setContent}
                            multiline
                        />
                    )}
                    <View style={styles.buttonRow}>
                        <Button title="Скасувати" onPress={onCancel} />
                        <Button title="Створити" onPress={handleSubmit} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 4,
        padding: 8,
        marginBottom: 12,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
