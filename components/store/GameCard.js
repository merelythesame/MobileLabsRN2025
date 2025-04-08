import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const GameImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Platform = styled.Text`
  color: gray;
  font-size: 12px;
`;

const PriceContainer = styled.View`
  align-items: flex-end;
`;

const OldPrice = styled.Text`
  text-decoration: line-through;
  color: gray;
`;

const NewPrice = styled.Text`
  color: #00ff99;
`;

const Discount = styled.Text`
  background-color: green;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 2px;
`;

export default function GameCard({ image, title, platform, price, oldPrice }) {
    return (
        <Card>
            <GameImage source={image} />
            <Info>
                <Title>{title}</Title>
                <Platform>{platform}</Platform>
            </Info>
            <PriceContainer>
                {oldPrice && <OldPrice>{oldPrice}</OldPrice>}
                <NewPrice>{price}</NewPrice>
                {oldPrice && (
                    <Discount>
                        -{Math.round((1 - parseFloat(price.slice(1)) / parseFloat(oldPrice.slice(1))) * 100)}%
                    </Discount>
                )}
            </PriceContainer>
        </Card>
    );
}
