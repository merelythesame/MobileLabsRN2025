import {View, Text, Image, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {useState} from "react";

export function ProfileScreen() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [firstName, setFirstName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Реєстрація</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Електронна пошта</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Пароль</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Пароль(ще раз)</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Прізвище</Text>
                <TextInput
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Ім'я</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />

            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title="Зареєструватися"
                    onPress={() => Alert.alert('Ви успішно зареєструвалися!')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333'
    },
    input: {
        width: '100%',
        height: 45,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16
    },

    buttonContainer: {
        marginTop: 20,
        width: '100%',
    },
});