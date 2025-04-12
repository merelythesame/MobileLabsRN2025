import {TouchableOpacity} from "react-native";
import SteamIcon from "../../assets/icons/steam.svg";
import SearchIcon from "../../assets/icons/searchIcon.svg";
import styled from "styled-components/native";

const HeaderContainer = styled.View`
    margin-top: 35px;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 2px;
`;

const HeaderTitle = styled.Text`
    color: white;
    font-weight: 400;
    font-size: 28px;
    line-height: 39px;
    letter-spacing: -0.48px;

`;

export default function Header({ hasSearchButton = true }) {
    return (
        <HeaderContainer>
            <TouchableOpacity style={{ flexDirection: "row", gap: 6, alignItems: "flex-end" }}>
                <SteamIcon />
                <HeaderTitle>Store</HeaderTitle>
            </TouchableOpacity>

            {hasSearchButton && (
                <TouchableOpacity>
                    <SearchIcon/>
                </TouchableOpacity>
            )}
        </HeaderContainer>
    );
}