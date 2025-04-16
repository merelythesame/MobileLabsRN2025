import React from 'react';
import {Text} from "react-native";
import styled, {useTheme} from 'styled-components/native';
import UserAvatar from '../UserAvatar';

const Container = styled.View`
    flex-direction: row;
    padding: 12px;
    align-items: center;
    background-color: ${(props) => props.theme.background};
`;

const TextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const Name = styled.Text`
    color: ${(props) => props.theme.headers};
    font-size: 16px;
    font-weight: 600;
    font-family: ABeeZee;
    line-height: 22px;
    letter-spacing: -0.18px;
`;

const Message = styled.Text`
    color: #7B8D9D;
    font-size: 14px;
    margin-top: 2px;
    font-family: ABeeZee;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.15px;

`;

const IndicatorContainer = styled.View`
    margin-left: 8px;
    align-items: center;
    justify-content: center;
`;

const Dot = styled.View`
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.unReadDot};
    border-radius: 5px;
`;

const UnreadBadge = styled.View`
    background-color: #4A90E2;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

const UnreadText = styled.Text`
    color: #FFFFFF;
    font-size: 12px;
    font-weight: 600;
`;


export default function UserMessage({ name, avatar, lastMessage, date, unread, status, sentByUser }){
    const theme = useTheme()
    return (
        <Container>
            <UserAvatar avatar={avatar} status={status} />
            <TextContainer>
                <Name>{name}</Name>
                <Message numberOfLines={1}>
                    <Text style={{ color: theme.headers}}>{sentByUser ? 'You: ' : ''}</Text>
                    {lastMessage} • {date}
                </Message>
            </TextContainer>
            <IndicatorContainer>
                {unread &&
                    <UnreadBadge>
                        <UnreadText>1</UnreadText>
                    </UnreadBadge>}
                {sentByUser ? <Dot/> : ''}

            </IndicatorContainer>
        </Container>
    );
};

