import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Products">
                <Stack.Screen name="Products" component={ProductListScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="Orders" component={OrdersHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
