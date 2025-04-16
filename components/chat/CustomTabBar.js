import {TouchableOpacity, View, Text} from "react-native";
import styled from "styled-components/native";

const BarContainer = styled.View`
    flex-direction: row;
    background-color: #2c2f3a;
    border-radius: 14px;
    padding: 4px;
    margin: 16px;
`;

export default function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <BarContainer>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            flex: 1,
                            backgroundColor: isFocused ? '#1C202C' : 'transparent',
                            borderRadius: 12,
                            alignItems: 'center',
                            height: 'fit-content',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: isFocused ? '#fff' : '#7a7f8c',  fontFamily: 'PingFang', fontSize: 14, padding: 8}}>
                            {route.name === 'Chats' ? 'Open chats' : 'My friends'}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </BarContainer>
    );
}