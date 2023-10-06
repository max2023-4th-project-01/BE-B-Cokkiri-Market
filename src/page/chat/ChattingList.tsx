import { styled } from 'styled-components';
import { useGetChatRooms } from '../../api/queries/useChatQuery';
import { Error } from '../../components/Error';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { ChattingItem } from './ChattingItem';

export function ChattingList() {
  const { data, isLoading, isError } = useGetChatRooms();

  return (
    <Container>
      <Header title="채팅" />
      <Body>
        {isLoading ? (
          <Loader />
        ) : (
          data?.map((chat, index) => <ChattingItem key={index} {...chat} />)
        )}
        {isError && <Error message="채팅방 목록을 가져오지 못 했습니다." />}
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
