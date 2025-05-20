import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { setProducts } from '../redux/slices/productsSlice';
import Tomato from '../assets/tomato.png';
import Apple from '../assets/apple.png';

const productsData = [
    { id: '1', name: 'Tomato', description: 'Fresh tomato just from land', price: 100, image: Tomato },
    { id: '2', name: 'Apple', description: 'Apple from the tree', price: 200, image: Apple },
];

export default function ProductListScreen({ navigation }) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(setProducts(productsData));
    }, []);

    return (
        <View>
            <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
            <Button title="Order History" onPress={() => navigation.navigate('Orders')} />
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={ item.image } style={styles.image} />
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>${item.price}</Text>
                        <Button title="Add to Cart" onPress={() => dispatch(addToCart(item))} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: { padding: 10, margin: 10, borderWidth: 1, borderColor: '#ccc' },
    image: { width: 100, height: 100 },
});
