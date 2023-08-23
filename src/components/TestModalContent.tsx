import { styled } from 'styled-components';

export default function TestModalContent() {
  return (
    <Content>
      <Notice>지역은 최소 1개, 최대 2개까지 설정 가능해요.</Notice>
      <Button>+ 추가</Button>
      <Button>X 삭제</Button>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`;

const Notice = styled.p`
  font: ${({ theme }) => theme.font.displayDefault12};
`;

const Button = styled.button`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 8px;
  border: 0.8px solid ${({ theme }) => theme.color.neutralBorder};
`;
