import { styled } from 'styled-components';
import { Header } from '../../components/Header';
import { ChattingItem, ChattingItemType } from './ChattingItem';

const testChatting: ChattingItemType[] = [
  {
    id: 1,
    chattingMember: {
      memberId: 1,
      profileImgUrl: 'https://avatars.githubusercontent.com/u/97204689?v=4',
      memberName: 'samsam',
    },
    latestMessage:
      '안녕하세요! 한 가지 궁금한 점이 있어서 챗 드려요~~~~~~~~~~~~~~~~~',
    unread: 1,
    updateTime: new Date('2023-07-30T14:22:23'),
    item: {
      itemId: 1,
      itemImgUri:
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
  },
  {
    id: 2,
    chattingMember: {
      memberId: 2,
      profileImgUrl: 'https://avatars.githubusercontent.com/u/97204689?v=4',
      memberName: 'fuze',
    },
    latestMessage: '애눌좀',
    unread: 2,
    updateTime: new Date('2023-07-30T14:22:23'),
    item: {
      itemId: 2,
      itemImgUri:
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
  },
];

export function ChattingList() {
  return (
    <Container>
      <Header title="채팅" />
      <Body>
        {testChatting.map((chat, index) => (
          <ChattingItem key={index} {...chat} />
        ))}
      </Body>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Body = styled.div`
  width: 100%;
  flex: 1;
  margin-top: 56px;
`;
