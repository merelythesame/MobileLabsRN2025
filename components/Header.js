import {TouchableOpacity} from "react-native";
import SteamIcon from "../assets/icons/steam.svg";
import SearchIcon from "../assets/icons/searchIcon.svg";
import styled from "styled-components/native";

const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 2px;
`;

const HeaderTitle = styled.Text`
    color: white;
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 28px;
    line-height: 39px;
    letter-spacing: -0.48px;


`;

export default function Header({ title, hasSearchButton = true }) {
    return (
        <HeaderContainer>
            <TouchableOpacity style={{ flexDirection: "row", gap: 6, alignItems: "flex-end" }}>
                <SteamIcon />
                <HeaderTitle>{title}</HeaderTitle>
            </TouchableOpacity>

            {hasSearchButton && (
                <TouchableOpacity>
                    <SearchIcon/>
                </TouchableOpacity>
            )}
        </HeaderContainer>
    );
}