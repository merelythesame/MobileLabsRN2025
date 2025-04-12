import React from 'react';
import {Text} from 'react-native'
import styled from 'styled-components/native';
import WindowsIcon from '../../assets/icons/windows.svg'
import MacIcon from '../../assets/icons/mac.svg'

const Banner = styled.ImageBackground`
    height: 230px;
    border-radius: 12px;
    overflow: hidden;
    justify-content: flex-end;
    padding: 16px;
    gap: 8px;
`;

const GameTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const Subtitle = styled.Text`
    color: rgba(255, 255, 255, 1);
    font-size: 13px;

`;

const InfoRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 22px;
    font-size: 12px;
`;

const PriceRow = styled.View`
    flex-direction: row;
`;

const DiscountTag = styled.View`
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%; 
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: rgba(0, 212, 75, 0.5);
    padding-left: 4px;
`;

const PricesContainer = styled.View`
    flex-direction: row;
    align-items: center;
    width: 55px;
    gap: 6px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background: rgba(0, 0, 0, 0.64);
    padding-right: 8px;
`;


const PriceTag = styled.Text`
    color: white;
`;

const OldPrice = styled.Text`
    text-decoration: line-through;
    margin-left: 6px;
    color: gray;
`;


export default function HeaderBanner({ image, title, subtitle, oldPrice, price, platform}) {
    return (
        <Banner source={image}>
            <GameTitle>{title}</GameTitle>
            <Subtitle>{subtitle}</Subtitle>
            <InfoRow>
                <PriceRow>
                    {price && <DiscountTag><Text style={{ color: "white"}}>-{Math.round((1-price / oldPrice) * 100)}%</Text></DiscountTag>}
                    <PricesContainer>
                        ${oldPrice && <OldPrice>{oldPrice}$</OldPrice>}
                        <PriceTag>${price}</PriceTag>
                    </PricesContainer>
                </PriceRow>
                {platform.includes('Windows') && <WindowsIcon width={16} height={16}/>}
                {platform.includes('Mac') && <MacIcon width={16} height={16}/>}
            </InfoRow>
        </Banner>
    );
}
