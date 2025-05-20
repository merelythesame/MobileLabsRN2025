import React from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

export default function CartScreen({ navigation }) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <View>
            <FlatList
                data={cart.items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>Price: ${item.price}</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={item.quantity.toString()}
                            onChangeText={text => dispatch(updateQuantity({ id: item.id, quantity: parseInt(text) || 1 }))}
                        />
                        <Button title="Remove" onPress={() => dispatch(removeFromCart(item.id))} />
                    </View>
                )}
            />
            <Text>Total: ${cart.total.toFixed(2)}</Text>
            <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
        </View>
    );
}

const styles = StyleSheet.create({
    item: { padding: 10, margin: 10, borderWidth: 1 },
    input: { borderWidth: 1, padding: 5, marginVertical: 5, width: 50 },
});
