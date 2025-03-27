import {HomeScreen} from "./HomeScreen";
import {GalleryScreen} from "./GalleryScreen";
import {ProfileScreen} from "./ProfileScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export function NavTab(){
    return (
        <Tab.Navigator id="MainTabNavigator">
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Галерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
    );
}