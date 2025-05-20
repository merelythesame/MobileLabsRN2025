import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function OrdersHistoryScreen() {
    const orders = useSelector(state => state.orders);

    return (
        <View>
            <FlatList
                data={orders}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>Date: {new Date(item.date).toLocaleString()}</Text>
                        <Text>Items: {item.count}</Text>
                        <Text>Total: ${item.total.toFixed(2)}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: { padding: 10, margin: 10, borderWidth: 1 },
});
