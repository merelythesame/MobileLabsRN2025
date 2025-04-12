import React from 'react';
import styled from 'styled-components/native';

const Tab = styled.TouchableOpacity`
  background-color: ${({ active }) => (active ? '#3399ff' : '#2a2a2a')};
  padding: 6px 14px;
  margin-right: 10px;
  border-radius: 16px;
`;

const TabText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function CategoryTab({ label, active, onPress }) {
    return (
        <Tab active={active} onPress={onPress}>
            <TabText>{label}</TabText>
        </Tab>
    );
}
