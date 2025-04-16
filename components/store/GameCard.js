import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import WindowsIcon from '../../assets/icons/windows.svg'
import MacIcon from '../../assets/icons/mac.svg'

const Card = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    height: fit-content;
`;

const GameImage = styled.Image`
    width: 72px;
    height: 50px;
    border-radius: 8px;
`;

const Info = styled.View`
    margin-left: 10px;
    flex: 1;
    gap: 7px;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.headers};
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.32px;
`;

const PlatformRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

const PlatformText = styled.Text`
    color: gray;
    font-size: 12px;
`;

const PriceContainer = styled.View`
    align-items: flex-end;
    font-size: 18px;
`;

const OldPrice = styled.Text`
    text-decoration: line-through;
    color: gray;
    font-size: 12px;
`;

const NewPrice = styled.Text`
    color: ${(props) => props.theme.headers};
`;

const OldNewPriceRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
`;

const Discount = styled.Text`
    background-color: #00D44B80;
    color: ${(props) => props.theme.discount};
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    margin-top: 2px;
`;

export default function GameCard({ image, title, platform=[], price, oldPrice }) {
    return (
        <Card>
            <GameImage source={image} />
            <Info>
                <Title>{title}</Title>
                <PlatformRow>
                    {platform.includes('Windows') && <WindowsIcon/>}
                    {platform.includes('Mac') && <MacIcon />}
                    {platform.includes('Windows') && <PlatformText>{platform[0]}</PlatformText>}
                    {platform.includes('Mac') && <PlatformText>{platform[1]}</PlatformText>}
                </PlatformRow>
            </Info>
            <PriceContainer>
                <OldNewPriceRow>
                    {oldPrice && <OldPrice>${oldPrice}</OldPrice>}
                    <NewPrice>${price}</NewPrice>
                </OldNewPriceRow>
                {oldPrice && (
                    <Discount>
                        -{Math.round((1-price / oldPrice) * 100)}%
                    </Discount>
                )}
            </PriceContainer>
        </Card>
    );
}
