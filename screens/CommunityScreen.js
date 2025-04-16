import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from "../components/Header";
import styled, {useTheme} from "styled-components/native";
import {useState} from "react";
import CategoryRow from "../components/CategoryRow";
import {communityCategories} from "../data/categories";
import {communityContent} from "../data/community";
import ContentCard from "../components/community/ContentCard";

const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  padding: 20px;
`;

const ScreenInfo = styled.Text`
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.15px;
    color: rgba(123, 141, 157, 1);
`;

const HeroSection = styled.View`
    gap: 20px;
`;


export default function CommunityScreen(){
    const theme = useTheme();
    const [selected, setSelected] = useState('All');
    return(
        <SafeAreaView style={{ flex: 1, gap: 8, backgroundColor: theme.background }}>
            <Container>
                <HeroSection>
                    <View style={{gap: "6"}}>
                        <Header title="Community" hasSearchButton={false}/>
                        <ScreenInfo>Community and official content for all games and software</ScreenInfo>
                    </View>
                    <CategoryRow
                        categories={communityCategories}
                        selected={selected}
                        onSelect={setSelected}
                    />
                </HeroSection>
            </Container>
            <FlatList
                data={communityContent}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ContentCard
                        publisher={item.publisher}
                        publisherIcon ={item.publisherIcon}
                        badge={item.badge}
                        time={item.time}
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                        highlight={item.highlight}
                        initialLikes={item.initialLikes}
                        comments={item.comments}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
        </SafeAreaView>
    );
}