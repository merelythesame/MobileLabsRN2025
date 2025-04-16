import {FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import {messages} from "../data/currentUser";
import UserMessage from "../components/chat/UserMessage";
import {useTheme} from "styled-components/native";
export default function OpenChatScreen(){
    const theme = useTheme()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <UserMessage
                            name={item.name}
                            avatar={item.avatar}
                            lastMessage={item.lastMessage}
                            date={item.date}
                            unread={item.unread}
                            status={item.status}
                            sentByUser={item.sentByUser}
                        />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#2C2C3A' }} />}
            />
        </SafeAreaView>
    );
}