import React, { useState, useEffect } from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export default function EditProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            const docRef = doc(db, 'users', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name);
                setAge(data.age);
                setCity(data.city);
            }
        };
        loadProfile();
    }, []);

    const handleUpdate = async () => {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            name,
            age,
            city,
        });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit profile</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
            <Button title="Save" onPress={handleUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    title: { fontSize: 24, textAlign: 'center' },
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5 },
});
