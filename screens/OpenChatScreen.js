import {FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import {messages} from "../data/currentUser";
import UserMessage from "../components/chat/UserMessage";
export default function OpenChatScreen(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1C202C' }}>
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