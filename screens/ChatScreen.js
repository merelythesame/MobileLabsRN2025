import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from "../components/Header";
import CustomTabBar from "../components/chat/CustomTabBar";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OpenChatsScreen from '../screens/OpenChatScreen'
import MyFriendsScreen from '../screens/MyFriendsScreen'
import {useTheme} from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

export default function ChatScreen(){
    const theme = useTheme()
    return(
        <SafeAreaView style={{ flex: 1, gap: 8, backgroundColor: theme.background }}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
                <Header title="Chat" hasSearchButton={true}/>
            </View>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props} tabLabels={{Chats: 'Chats', Friends: 'My Friends'}} />}>
                <Tab.Screen name="Chats" component={OpenChatsScreen} />
                <Tab.Screen name="Friends" component={MyFriendsScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}