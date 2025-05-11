import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function FileInfo({ filePath }) {
    const [fileInfo, setFileInfo] = useState(null);

    useEffect(() => {
        const fetchFileInfo = async () => {
            try {
                console.log('Отримуємо info для:', filePath);
                const info = await FileSystem.getInfoAsync(filePath);
                console.log('Інформація про файл:', info);
                if (info.exists) {
                    const name = filePath.split('/').pop();
                    const fileExtension = filePath.split('.').pop();
                    const fileSize = info.size ? (info.size / 1024).toFixed(2) : 'N/A';
                    const lastModified = new Date(info.modificationTime * 1000).toString();
                    setFileInfo({
                        name,
                        type: fileExtension,
                        size: fileSize,
                        lastModified,
                    });
                }
            } catch (error) {
                console.error('Помилка отримання даних:', error);
            }
        };

        if (filePath) {
            fetchFileInfo();
        }
    }, [filePath]);

    if (!fileInfo) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>Назва файлу: {fileInfo.name}</Text>
            <Text style={styles.infoText}>Тип файлу: {fileInfo.type}</Text>
            <Text style={styles.infoText}>Розмір: {fileInfo.size} KB</Text>
            <Text style={styles.infoText}>Дата останньої модифікації: {fileInfo.lastModified}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 8,
    },
});
