import React, {useContext, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from "axios";
import {apiKey} from "../data";
import {AuthContext} from "../context/AuthContext";
import api from "../services/api";
import {jwtDecode} from "jwt-decode";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useContext(AuthContext);

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );

            const idToken = response.data.idToken;
            const userId = jwtDecode(idToken).user_id;

            await setToken(idToken);

            await api.post(`/users/${userId}.json`, {
                email,
                createdAt: new Date().toISOString()
            });

        } catch (error) {
            alert('Помилка входу: ' + error.response?.data?.error?.message || error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
});
