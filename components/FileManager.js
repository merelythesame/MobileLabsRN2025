import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import CreateItemModal from './CreateItem';
import TextFileViewer from './TextFileViewer';
import RenderItem from './RenderItem';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

export default function FileManager() {
    const [currentPath, setCurrentPath] = useState(ROOT_DIR);
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [storageStats, setStorageStats] = useState(null);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        const init = async () => {
            const dirInfo = await FileSystem.getInfoAsync(ROOT_DIR);
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
            }
            readDirectory(ROOT_DIR);
        };
        init();
    }, []);

    const handleCreate = async (type, name, content) => {
        if (!name.trim()) return;
        try {
            if (type === 'folder') {
                await FileSystem.makeDirectoryAsync(currentPath + name);
            } else if (type === 'file') {
                await FileSystem.writeAsStringAsync(currentPath + name + '.txt', content);
            }
            readDirectory(currentPath);
        } catch (error) {
            Alert.alert('Помилка створення', error.message);
        }
        setModalVisible(false);
    };

    const readDirectory = async (path) => {
        try {
            const dirItems = await FileSystem.readDirectoryAsync(path);
            const detailedItems = await Promise.all(
                dirItems.map(async (item) => {
                    const itemInfo = await FileSystem.getInfoAsync(path + item);
                    return { name: item, isDirectory: itemInfo.isDirectory, path: path + item + (itemInfo.isDirectory ? '/' : '') };
                })
            );
            setItems(detailedItems);
        } catch (error) {
            Alert.alert('Помилка читання директорії', error.message);
        }
    };

    const navigateTo = (item) => {
        if (item.isDirectory) {
            setCurrentPath(item.path);
            readDirectory(item.path);
        } else if (item.name.endsWith('.txt')) {
            setSelectedFile(item.path);
        }
    };

    const goUp = () => {
        if (currentPath !== ROOT_DIR) {
            const relativePath = currentPath.replace(ROOT_DIR, '');
            const pathParts = relativePath.split('/').filter(Boolean);
            pathParts.pop();

            const newRelativePath = pathParts.length ? pathParts.join('/') + '/' : '';
            const newPath = ROOT_DIR + newRelativePath;

            setCurrentPath(newPath);
            readDirectory(newPath);
        }
    };

    const handleSaveFile = async (path, content) => {
        try {
            await FileSystem.writeAsStringAsync(path, content);
            Alert.alert('Збережено', 'Файл успішно збережено.');
            setSelectedFile(null);
        } catch (error) {
            Alert.alert('Помилка збереження', error.message);
        }
    };

    const toggleStorageStats = async () => {
        if (showStats) {
            setShowStats(false);
            return;
        }
        try {
            const total = await FileSystem.getTotalDiskCapacityAsync();
            const free = await FileSystem.getFreeDiskStorageAsync();
            const used = total - free;
            setStorageStats({
                total: (total / (1024 * 1024)).toFixed(2),
                free: (free / (1024 * 1024)).toFixed(2),
                used: (used / (1024 * 1024)).toFixed(2),
            });
            setShowStats(true);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося отримати статистику памʼяті.');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.path}>Поточна директорія: {currentPath.replace(ROOT_DIR, 'AppData/')}</Text>
            {currentPath !== ROOT_DIR && (
                <TouchableOpacity style={styles.goUp} onPress={goUp}>
                    <Text style={styles.goUpText}>⬆ Назад</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={items}
                keyExtractor={(item) => item.path}
                renderItem={({ item }) => (
                    <RenderItem
                        item={item}
                        navigateTo={navigateTo}
                        readDirectory={readDirectory}
                        currentPath={currentPath}
                    />
                )}
                contentContainerStyle={styles.list}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Button title="Створити папку" onPress={() => { setModalType('folder'); setModalVisible(true); }} />
                <Button title="Створити файл" onPress={() => { setModalType('file'); setModalVisible(true); }} />
            </View>

            <CreateItemModal
                visible={modalVisible}
                type={modalType}
                onCreate={handleCreate}
                onCancel={() => setModalVisible(false)}
            />

            {selectedFile && (
                <TextFileViewer
                    filePath={selectedFile}
                    onClose={() => setSelectedFile(null)}
                    onSave={handleSaveFile}
                />
            )}

            <Button title={showStats ? 'Сховати статистику' : 'Статистика памʼяті'} onPress={toggleStorageStats} />

            {showStats && storageStats && (
                <View style={styles.statsBox}>
                    <Text>Загальна памʼять: {storageStats.total} MB</Text>
                    <Text>Вільно: {storageStats.free} MB</Text>
                    <Text>Зайнято: {storageStats.used} MB</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    path: { fontSize: 16, marginBottom: 8 },
    list: { paddingBottom: 100 },
    goUp: { marginBottom: 12 },
    goUpText: { color: 'blue', fontSize: 16 },
    statsBox: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 8,
    },
});
