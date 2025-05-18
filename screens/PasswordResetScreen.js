import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function PasswordResetScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handleReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent.');
            navigation.navigate('Login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <Button title="Send Reset Email" onPress={handleReset} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});
