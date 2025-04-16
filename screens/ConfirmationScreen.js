import {SafeAreaView, Text} from "react-native";
import {useTheme} from "styled-components/native";

export default function ConfirmationScreen(){
    const theme = useTheme()
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <Text style={{ color: theme.headers}}>Confirmation Screen </Text>
        </SafeAreaView>
    );
}