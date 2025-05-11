import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import CreateItemModal from './CreateItem';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

export default function FileManager() {
    const [currentPath, setCurrentPath] = useState(ROOT_DIR);
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);

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
            Alert.alert('Error reading directory', error.message);
        }
    };

    const navigateTo = (item) => {
        if (item.isDirectory) {
            setCurrentPath(item.path);
            readDirectory(item.path);
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


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigateTo(item)}>
            <Text style={{ fontWeight: item.isDirectory ? 'bold' : 'normal' }}>{item.name}</Text>
        </TouchableOpacity>
    );

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
                renderItem={renderItem}
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    path: { fontSize: 16, marginBottom: 8 },
    list: { paddingBottom: 100 },
    item: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc', height: "auto" },
    goUp: { marginBottom: 12 },
    goUpText: { color: 'blue', fontSize: 16 },
});
