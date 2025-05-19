import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error('Помилка при зчитуванні токена з AsyncStorage', error);
            } finally {
                setLoading(false);
            }
        };

        loadToken();
    }, []);

    const saveToken = async (newToken) => {
        try {
            await AsyncStorage.setItem('token', newToken);
            setToken(newToken);
        } catch (error) {
            console.error('Помилка при збереженні токена', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setToken(null);
        } catch (error) {
            console.error('Помилка при видаленні токена', error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, setToken: saveToken, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

