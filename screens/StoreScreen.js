import React, { useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import GameCard from '../components/store/GameCard';
import HeaderBanner from '../components/store/HeaderBanner';
import Header from '../components/Header';
import { games, bannerData } from '../data/games';
import { storeCategories } from '../data/categories';
import CategoryRow from '../components/CategoryRow';

export default function StoreScreen() {
    const [selected, setSelected] = useState('Top Sellers');
    const theme = useTheme();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.background }}>
            <View style={{ flex: 0.9, paddingHorizontal: 20 }}>
                <View style={{ gap: 25 }}>
                    <Header title="Store" />
                    <FlatList
                        data={bannerData}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <HeaderBanner
                                image={item.image}
                                title={item.title}
                                subtitle={item.subtitle}
                                oldPrice={item.oldPrice}
                                price={item.price}
                                platform={item.platform}
                            />
                        )}
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                        contentContainerStyle={{ paddingBottom: 30 }}
                    />
                </View>

                <CategoryRow
                    categories={storeCategories}
                    selected={selected}
                    onSelect={setSelected}
                    hasSearch={false}
                />

                <FlatList
                    data={games}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <GameCard {...item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                />
            </View>
        </SafeAreaView>
    );
}
