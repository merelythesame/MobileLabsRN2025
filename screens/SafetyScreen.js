import {SafeAreaView, View} from 'react-native';
import Header from "../components/Header";
import CustomTabBar from "../components/chat/CustomTabBar";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import GuardScreen from "./GuardScreen";
import ConfirmationScreen from "./ConfirmationScreen";
import {useTheme} from "styled-components/native";

const Tab = createMaterialTopTabNavigator();

export default function SafetyScreen(){
    const theme = useTheme()
    return(
        <SafeAreaView style={{ flex: 1, gap: 8, backgroundColor: theme.background }}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
                <Header title="Safety" hasSearchButton={true}/>
            </View>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props} tabLabels={{Guard: 'Guard', Confirmations: 'Confirmations'}} />}>
                <Tab.Screen name="Guard" component={GuardScreen} />
                <Tab.Screen name="Confirmations" component={ConfirmationScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}