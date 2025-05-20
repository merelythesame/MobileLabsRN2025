import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { addOrder } from '../redux/slices/ordersSlice';
import { setUser } from '../redux/slices/userSlice';

export default function CheckoutScreen({ navigation }) {
    const [name, setNameInput] = useState('');
    const [email, setEmailInput] = useState('');
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(setUser({ name, email }));
        dispatch(addOrder({ items: cart.items, total: cart.total }));
        dispatch(clearCart());
        Alert.alert('Success', 'Order placed successfully', [
            { text: 'OK', onPress: () => navigation.navigate('Products') }
        ]);
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput placeholder="Name" value={name} onChangeText={setNameInput} style={{ borderBottomWidth: 1 }} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmailInput} style={{ borderBottomWidth: 1, marginTop: 10 }} />
            <Button title="Submit Order" onPress={handleSubmit} />
        </View>
    );
}
