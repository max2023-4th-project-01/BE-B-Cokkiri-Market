import { styled } from 'styled-components';
import { getElapsedSince } from '../../utils/getElapsedSince';

export type ChattingItemType = {
  id: number;
  chattingMember: {
    memberId: number;
    profileImgUrl: string;
    memberName: string;
  };
  latestMessage: string;
  unread: number;
  updateTime: Date;
  item: {
    itemId: number;
    itemImgUri: string;
  };
};
export function ChattingItem({
  id,
  chattingMember,
  latestMessage,
  unread,
  updateTime,
  item,
}: ChattingItemType) {
  return (
    <Container onClick={() => console.log(id)}>
      <ImageWrapper>
        <ProfileImage src={chattingMember.profileImgUrl} />
      </ImageWrapper>
      <ChatInfo>
        <NameAndTimestamp>
          <Name>{chattingMember.memberName}</Name>
          <Timestamp>{getElapsedSince(updateTime)}</Timestamp>
        </NameAndTimestamp>
        <LatestMessage>{latestMessage}</LatestMessage>
      </ChatInfo>
      <Unread>
        <UnreadBadge>{unread}</UnreadBadge>
      </Unread>
      <ImageWrapper>
        <ProductImage src={item.itemImgUri} />
      </ImageWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 18px;
  border-bottom: 0.8px solid ${({ theme }) => theme.color.neutralBorder};
`;

const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50px;
`;

const ChatInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  table-layout: fixed;
`;

const NameAndTimestamp = styled.div`
  width: 100%;
  display: flex;
  height: 24px;
  align-items: center;
  gap: 4px;
`;

const Name = styled.div`
  color: ${({ theme }) => theme.color.neutralTextStrong};
  font: ${({ theme }) => theme.font.displayStrong16};
`;

const Timestamp = styled.div`
  color: ${({ theme }) => theme.color.neutralTextWeak};
  font: ${({ theme }) => theme.font.displayDefault12};
`;

const LatestMessage = styled.div`
  width: 90%;
  color: ${({ theme }) => theme.color.neutralText};
  font: ${({ theme }) => theme.font.displayDefault12};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Unread = styled.div`
  width: 20px;
  height: 100%;
`;

const UnreadBadge = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.accentPrimary};
  color: ${({ theme }) => theme.color.accentText};
  font: ${({ theme }) => theme.font.displayDefault12};
  border-radius: 50%;
`;

const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
`;
