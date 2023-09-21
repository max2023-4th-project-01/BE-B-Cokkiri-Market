import { styled } from 'styled-components';
import { Header } from '../components/Header';

export function Chatting() {
  return (
    <Container>
      <Header title="채팅" />
      <Body>
        <div>채팅 페이지 구현 예정</div>
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
  flex: 1;
  margin-top: 56px;
`;
