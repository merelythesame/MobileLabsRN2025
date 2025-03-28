import {HomeScreen} from "./HomeScreen";
import {GalleryScreen} from "./GalleryScreen";
import {ProfileScreen} from "./ProfileScreen";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();

export function NavTab() {
    return (
        <Tab.Navigator
            id="MainTabNavigator"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Головна") {
                        iconName = "home";
                    } else if (route.name === "Галерея") {
                        iconName = "image";
                    } else if (route.name === "Профіль") {
                        iconName = "person";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "lightgrey",
                    height: 70,
                }
            })}
        >
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Галерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
    );
}