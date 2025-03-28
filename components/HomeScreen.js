import {View, Text, StyleSheet} from 'react-native';
import {News} from "./News";

export function HomeScreen() {
    return (
        <View style={{alignItems: 'center'}}>
            <View>
                <Text style={styles.header}>Новини</Text>
            </View>
            <News/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20
    }
});

