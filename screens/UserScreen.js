import { useTheme } from 'styled-components/native';
import {SafeAreaView, View} from 'react-native';
import {currentUser} from "../data/currentUser";
import UserAvatar from "../components/UserAvatar";
import NextIcon from "../assets/icons/next.svg";
import styled from "styled-components/native";

const NavWrapper = styled.View`
    width: 100%;
    padding: 0 20px;
`;

const NavButtons = styled.View`
    background-color: #2c2f3a;
    border-radius: 16px;
    overflow: hidden;
`;

const Button = styled.TouchableOpacity`
    padding: 18px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #1C202C;
`;

const ButtonText = styled.Text`
    color: #fff;
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.32px;

`;

const Info = styled.Text`
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.18px;
    color: ${(props) => props.theme.headers};
`;


export default function UserScreen({toggleTheme}){
    const theme = useTheme();
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background, padding: 20, alignItems: 'center', gap: 20}}>
            <View style={{alignItems: 'center', gap: 6}}>
                <UserAvatar avatar={currentUser.image} status={'online'} size={98}/>
                <Info >{currentUser.firstName} {currentUser.lastName}</Info>
                <Info >{currentUser.group}</Info>
            </View>

            <NavWrapper>
                <NavButtons>
                    <Button onPress={toggleTheme}>
                        <ButtonText>Change theme</ButtonText>
                        <NextIcon />
                    </Button>
                    <Button style={{ borderBottomWidth: 0 }} >
                        <ButtonText>Logout</ButtonText>
                        <NextIcon />
                    </Button>
                </NavButtons>
            </NavWrapper>
        </SafeAreaView>
    );
}