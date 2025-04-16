import React, { useEffect, useState } from 'react';
import {Animated, ImageBackground, View} from 'react-native';
import styled from 'styled-components/native';
import NextIcon from '../assets/icons/next.svg'

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
    gap: 24px;
`;

const CodeContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const BackgroundImage = styled(ImageBackground)`
    height: 170px;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const InnerContent = styled.View`
    align-items: center;
`;

const LoggedInText = styled.Text`
    color: #7b8d9d;
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.15px;
`;

const Code = styled.Text`
    color: white;
    font-family: Gilroy;
    font-weight: 700;
    font-size: 48px;
    letter-spacing: 6px;
`;

const ProgressBarBackground = styled.View`
    height: 7px;
    width: 160px;
    background-color: #3b3f4c;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: row;
`;

const ProgressFill = styled(Animated.View)`
    background-color: #62b0ff;
    height: 7px;
`;

const RemainingFill = styled.View`
    height: 7px;
`;

const InfoBlock = styled.View`
    padding-horizontal: 20px;
`;

const InfoText = styled.Text`
    color: ${(props) => props.theme.headers};
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.28px;

`;

const TipText = styled.Text`
    color: #2FB4F1;
    font-size: 13px;
    margin-top: 10px;
    font-family: ABeeZee;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.15px;

`;

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

export default function GuardScreen() {
    const [code, setCode] = useState(generateCode());
    const [progress, setProgress] = useState(new Animated.Value(1));
    const [secondsLeft, setSecondsLeft] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            if (secondsLeft <= 1) {
                setCode(generateCode());
                setSecondsLeft(30);
                resetProgress();
            } else {
                setSecondsLeft(prev => prev - 1);
            }
        }, 1000);

        animateProgress();

        return () => clearInterval(interval);
    }, [secondsLeft]);

    function resetProgress() {
        setProgress(new Animated.Value(1));
        animateProgress();
    }

    function animateProgress() {
        Animated.timing(progress, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: false,
        }).start();
    }

    return (
        <Container>
            <CodeContainer>
                <BackgroundImage source={require('../assets/bg.png')} resizeMode="cover">
                    <InnerContent>
                        <LoggedInText>Logged in as player</LoggedInText>
                        <Code>{code}</Code>

                        <ProgressBarBackground>
                            <ProgressFill style={{ flex: progress }} />
                            <RemainingFill style={{ flex: 1 - progress.__getValue() }} />
                        </ProgressBarBackground>
                    </InnerContent>
                </BackgroundImage>
            </CodeContainer>


            <InfoBlock>
                <InfoText>
                    You’ll enter your code each time you enter your password to sign in to your Steam account.
                </InfoText>
                <TipText>
                    Tip: If you don’t share your PC, you can select “Remember my password” when you sign in to the PC client to enter your password and authenticator code less often.
                </TipText>
            </InfoBlock>

            <NavWrapper>
                <NavButtons>
                    <Button>
                        <ButtonText>Remove Authenticator</ButtonText>
                        <NextIcon />
                    </Button>
                    <Button>
                        <ButtonText>My Recovery Code</ButtonText>
                        <NextIcon />
                    </Button>
                    <Button style={{ borderBottomWidth: 0 }}>
                        <ButtonText>Help</ButtonText>
                        <NextIcon />
                    </Button>
                </NavButtons>
            </NavWrapper>

        </Container>
    );
}

function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}



