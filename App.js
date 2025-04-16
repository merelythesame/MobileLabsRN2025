import NavigationComponent from './components/navigation/NavigationComponent'
import * as Font from 'expo-font';

export default function App() {
    const [fontsLoaded] = Font.useFonts({
        ABeeZee: require('./assets/fonts/ABeeZee-Regular.ttf'),
        PingFang: require('./assets/fonts/PingFang-SC-Regular.ttf'),
    });

    return (
        <NavigationComponent/>
    );
}

