import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Image, Touchable, TouchableOpacity, View} from 'react-native';
import LikeIcon from '../../assets/icons/like.svg';
import CommentIcon from '../../assets/icons/comment.svg';
import ShareIcon from '../../assets/icons/share.svg';
import {formatTimestamp} from "../../utils/formatTimeStamp";
import MoreIcon from "../../assets/icons/more.svg"

const CardContainer = styled.View`
  background-color: #1C202C;
  padding: 16px;
`;

const HeaderRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const PublisherInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PublisherIcon = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 20px;
    margin-right: 8px;
`;

const PublisherText = styled.Text`
    color: white;
    margin-right: 8px;
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.32px;

`;

const NewsBadge = styled.Text`
  background-color: #b44cff;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
`;

const PostMeta = styled.Text`
    color: #7B8D9D;
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.24px;

`;

const ContentImage = styled.Image`
  width: 100%;
  height: 190px;
  border-radius: 10px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
    color: white;
    margin-bottom: 8px;
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.32px;

`;

const Subtitle = styled.View`
  margin-bottom: 16px;
`;

const SubtitleText = styled.Text`
    color: #7B8D9D;
    font-family: ABeeZee;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.28px;

`;

const ActionRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Action = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const ActionText = styled.Text`
    color: ${({ active }) => (active ? '#00D44B' : '#7B8D9D')};
    font-size: 13px;
`;


export default function ContentCard({publisher,publisherIcon, badge, time, image, title, subtitle, initialLikes, comments}) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked((prev) => !prev);
        setLikes((prev) => liked ? prev - 1 : prev + 1);
    };

    return (
        <CardContainer>
            <HeaderRow>
                <PublisherInfo>
                    <TouchableOpacity>
                        <PublisherIcon source={publisherIcon} />
                    </TouchableOpacity>
                    <View>
                        <View style={{ flexDirection: 'row'}}>
                            <TouchableOpacity>
                                <PublisherText>{publisher}</PublisherText>
                            </TouchableOpacity>
                            {badge && <NewsBadge>{badge}</NewsBadge>}
                        </View>
                        <PostMeta>{formatTimestamp(time)}</PostMeta>
                    </View>
                </PublisherInfo>
                <TouchableOpacity>
                    <MoreIcon/>
                </TouchableOpacity>
            </HeaderRow>

            <ContentImage source={image} />

            <Title>{title}</Title>

            <Subtitle>
                <SubtitleText>
                    {subtitle}
                </SubtitleText>
            </Subtitle>

            <ActionRow>
                <Action onPress={toggleLike}>
                    <LikeIcon width={20} height={20} fill={liked ? '#00D44B' : '#7B8D9D'} />
                    <ActionText active={liked}>{likes}</ActionText>
                </Action>
                <Action>
                    <CommentIcon width={20} height={20} />
                    <ActionText>{comments}</ActionText>
                </Action>
                <Action>
                    <ShareIcon width={20} height={20} />
                </Action>
            </ActionRow>
        </CardContainer>
    );
}
