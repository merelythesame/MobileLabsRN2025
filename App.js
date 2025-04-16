import NavigationComponent from './components/navigation/NavigationComponent'
import * as Font from 'expo-font';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "./data/themes";

export default function App() {
    const [fontsLoaded] = Font.useFonts({
        ABeeZee: require('./assets/fonts/ABeeZee-Regular.ttf'),
        PingFang: require('./assets/fonts/PingFang-SC-Regular.ttf'),
        Gilroy: require('./assets/fonts/Gilroy-ExtraBold.otf'),
    });

    const [themeMode, setThemeMode] = useState('dark');
    const theme = themeMode === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('appTheme');
            if (savedTheme) {
                setThemeMode(savedTheme);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(newTheme);
        await AsyncStorage.setItem('appTheme', newTheme);
    };

    return (
        <ThemeProvider theme={theme}>
            <NavigationComponent toggleTheme={toggleTheme} />
        </ThemeProvider>
    );
}

