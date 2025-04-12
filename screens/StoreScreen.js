import React, { useState } from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import GameCard from '../components/store/GameCard';
import CategoryTab from '../components/store/CategoryTab';
import HeaderBanner from '../components/store/HeaderBanner';
import Header from "../components/store/Header";
import {games} from "../data/games";

const Container = styled.View`
  background-color: #1C202C;
  flex: 1;
  padding: 16px;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  margin: 16px 0;
`;

export default function StoreScreen() {
    const [selected, setSelected] = useState('Top Sellers');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <Header/>
                <HeaderBanner
                    image={require('../assets/games/deadbydaylight.png')}
                    title="Dead by Daylight"
                    subtitle="Recommended by your friend, Player"
                    oldPrice="18"
                    price="5"
                    platform="Windows"
                />

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