import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import StoreScreen from "../../screens/StoreScreen";
import CommunityScreen from "../../screens/CommunityScreen";
import ChatScreen from "../../screens/ChatScreen";
import SafetyScreen from "../../screens/SafetyScreen";
import UserScreen from "../../screens/UserScreen";

import StoreIcon from '../../assets/icons/bag.svg';
import CommunityIcon from '../../assets/icons/user.svg';
import ChatIcon from '../../assets/icons/path.svg';
import SafetyIcon from '../../assets/icons/shield.svg';
import {currentUser} from "../../data/currentUser";
import styled from "styled-components";

const Tab = createBottomTabNavigator();

const CurrentUserImage = styled.Image`
    width: 25px;
    height: 25px;
    border-radius: 20px;
`;

const ICONS = {
    Store: StoreIcon,
    Community: CommunityIcon,
    Chat: ChatIcon,
    Safety: SafetyIcon,
};

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
        if (route.name === 'UserProfile') {
            return <CurrentUserImage source={currentUser.image}/>
        }

        const Icon = ICONS[route.name];
        return (
            <Icon width={25} height={25} stroke={focused ? '#fff' : '#5c5c5c'} />
        );
    },
    tabBarLabel: () => null,
    headerShown: false,
    tabBarStyle: {
        backgroundColor: '#12141C',
        height: 70,
        paddingBottom: 20,
        paddingTop: 20,
        borderTopWidth: 0,
    },
});

export default function NavigationComponent() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="Store" component={StoreScreen} />
                <Tab.Screen name="Community" component={CommunityScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Safety" component={SafetyScreen} />
                <Tab.Screen name="UserProfile" component={UserScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}