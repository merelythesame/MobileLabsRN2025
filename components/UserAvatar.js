import {View, Image} from "react-native";
import styled from "styled-components/native";
import DefaultAvatar from "../assets/users/default.svg";

const OnlineDot = styled.View`
    background-color: #00D44B;
    position: absolute;
    bottom: 2px;
    right: 2px;
`;

const AwayDot = styled.View`
    background-color: #31BCFC;
    position: absolute;
    bottom: 2px;
    right: 2px;
`;

export default function UserAvatar({ avatar, status, size = 48 }){
    return (
        <View style={{ position: 'relative', width: size, height: size }}>
            {avatar ? <Image source={avatar} style={{ width: size, height: size, borderRadius: size / 2 }} /> :
                <DefaultAvatar/>}
            {status === 'online' && (
                <OnlineDot style={{
                    width: size * 0.2,
                    height: size * 0.2,
                    borderRadius: (size * 0.2) / 2
                }} />
            )}
            {status === 'away' && (
                <AwayDot style={{
                    width: size * 0.2,
                    height: size * 0.2,
                    borderRadius: (size * 0.2) / 2
                }} />
            )}
        </View>
    );
};