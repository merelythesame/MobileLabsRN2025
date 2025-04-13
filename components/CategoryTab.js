import React from 'react';
import styled from 'styled-components/native';

const Tab = styled.TouchableOpacity`
    background-color: ${({ active }) => (active ? '#3399ff' : '#303649')};
    padding: 6px 14px;
    margin-right: 10px;
    border-radius: 8px;
    height: 38px;
    justify-content: center;
`;

const TabText = styled.Text`
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.15px;
    color: white;
`;

export default function CategoryTab({ label, active, onPress }) {
    return (
        <Tab active={active} onPress={onPress}>
            <TabText>{label}</TabText>
        </Tab>
    );
}
