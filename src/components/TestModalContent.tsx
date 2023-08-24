import { styled } from 'styled-components';
import { Button } from './Button';

export function TestModalContent() {
  return (
    <Content>
      <Notice>지역은 최소 1개, 최대 2개까지 설정 가능해요.</Notice>
      <Buttons>
        <Button styledType="container" color="accentPrimary">
          <Location>역삼 1동</Location>
        </Button>
        <Button styledType="outline" color="neutralBorder">
          <Plus>+ 추가</Plus>
        </Button>
      </Buttons>
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
  align-self: stretch;
  text-align: center;
  font: ${({ theme }) => theme.font.displayDefault12};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Location = styled.div`
  width: 256px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentText};
`;

const Plus = styled.div`
  width: 256px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentTextWeak};
`;
