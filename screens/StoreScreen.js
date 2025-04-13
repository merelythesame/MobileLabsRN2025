import React, { useState } from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import GameCard from '../components/store/GameCard';
import CategoryTab from '../components/CategoryTab';
import HeaderBanner from '../components/store/HeaderBanner';
import Header from "../components/Header";
import {games, bannerData} from "../data/games";

const Container = styled.View`
  background-color: #1C202C;
  padding: 20px;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  margin: 30px 0 20px 0;
`;

export default function StoreScreen() {
    const [selected, setSelected] = useState('Top Sellers');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1C202C' }}>
            <Container>
                <View style={{gap: 25}}>
                    <Header title="Store"/>
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
                    />
                </View>

                <CategoryRow>
                    {['Top Sellers', 'Free to play', 'Early Access'].map((label) => (
                        <CategoryTab
                            key={label}
                            label={label}
                            active={selected === label}
                            onPress={() => setSelected(label)}
                        />
                    ))}
                </CategoryRow>

                <FlatList
                    data={games}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <GameCard {...item} />}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
        </SafeAreaView>
    );
}