import React, { useContext, useEffect, useState } from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet, Alert} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import PostItem from '../components/PostItem';
import { jwtDecode } from 'jwt-decode';

export default function HomeScreen() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState([]);
    const { logout } = useContext(AuthContext);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loadUserId = async () => {
            const token = await AsyncStorage.getItem('token');
            const decoded = jwtDecode(token);
            setUserId(decoded.user_id || decoded.localId);
            fetchPosts(decoded.user_id || decoded.localId);
        };
        loadUserId();
    }, []);

    const fetchPosts = async (uid) => {
        try {
            const res = await api.get(`/users/${uid}/posts.json`);
            const data = res.data || {};
            const postArray = Object.keys(data).map(id => ({ id, ...data[id] }));
            setPosts(postArray);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async () => {
        if (!title || !body) return;

        const newPost = { title, body, createdAt: new Date().toISOString() };

        try {
            await api.post(`/users/${userId}/posts.json`, newPost);
            setTitle('');
            setBody('');
            fetchPosts(userId);
        } catch (e) {
            Alert.alert('Помилка', 'Не вдалося створити пост');
        }
    };

    const handleDelete = async (postId) => {
        try {
            await api.delete(`/users/${userId}/posts/${postId}.json`);
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch (e) {
            Alert.alert('Помилка', 'Не вдалося видалити пост');
        }
    };

    const handleUpdate = async (postId, newTitle, newBody) => {
        try {
            await api.put(`/users/${userId}/posts/${postId}.json`, {
                title: newTitle,
                body: newBody,
            });
            fetchPosts(userId);
        } catch (e) {
            Alert.alert('Помилка', 'Не вдалося оновити пост');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Body"
                value={body}
                onChangeText={setBody}
                multiline
            />
            <Button title="Створити пост" onPress={handleSubmit} />

            <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Пости:</Text>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PostItem
                            post={item}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    )}
                    ListEmptyComponent={<Text>Немає постів</Text>}
                />
            </View>

            <Button title="Вийти" color="red" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 5 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
