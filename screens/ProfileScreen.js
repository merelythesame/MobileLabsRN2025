import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
    const { user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const fetchProfile = async () => {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProfile(docSnap.data());
                    }
                } catch (e) {
                    console.error('Failed to fetch profile:', e);
                }
            };

            fetchProfile();
        }, [user.uid])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {profile && (
                <>
                    <Text>Name: {profile.name}</Text>
                    <Text>Age: {profile.age}</Text>
                    <Text>City: {profile.city}</Text>
                </>
            )}
            <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <Button title="Logout" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, gap: 10 },
    title: { fontSize: 24, textAlign: 'center' },
});
