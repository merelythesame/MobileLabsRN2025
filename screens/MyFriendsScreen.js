import {SafeAreaView, Text} from "react-native";
import {useTheme} from "styled-components/native";

export default function MyFriendsScreen(){
    const theme = useTheme()
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <Text style={{ color: theme.headers}}>MyFriends Screen</Text>
        </SafeAreaView>
    );
}