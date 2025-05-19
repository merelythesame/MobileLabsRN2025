import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
    baseURL: `https://lab-7-7469e-default-rtdb.firebaseio.com/`,
    timeout: 10000,
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.params = {
                ...config.params,
                auth: token,
            };

            const decoded = jwtDecode(token);
            const userId = decoded?.user_id;

            if (userId && config.url.includes('{user_id}')) {
                config.url = config.url.replace('{user_id}', userId);
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');

            Alert.alert('Сесія завершена', 'Будь ласка, увійдіть знову.');

            if (global.navigationRef) {
                global.navigationRef.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;
