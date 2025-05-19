import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function PostItem({ post, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);

    const handleSave = () => {
        onUpdate(post.id, editedTitle, editedBody);
        setEditing(false);
    };

    return (
        <View style={styles.container}>
            {editing ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                    />
                    <TextInput
                        style={[styles.input, { height: 60 }]}
                        value={editedBody}
                        onChangeText={setEditedBody}
                        multiline
                    />
                    <Button title="Зберегти" onPress={handleSave} />
                    <Button title="Скасувати" onPress={() => setEditing(false)} />
                </>
            ) : (
                <>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text>{post.body}</Text>
                    <View style={styles.actions}>
                        <Button title="Редагувати" onPress={() => setEditing(true)} />
                        <Button title="Видалити" onPress={() => onDelete(post.id)} color="red" />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 10 },
    title: { fontWeight: 'bold', fontSize: 16 },
    input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 6 },
    actions: { flexDirection: 'row', gap: 10, marginTop: 10 },
});
