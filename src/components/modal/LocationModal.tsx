import { useState } from 'react';
import { styled } from 'styled-components';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { Icon } from '../icon/Icon';
import { Modal } from './Modal';

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Header>
          <Headline>동네 설정</Headline>
          <Button styledType="ghost" onClick={onClose}>
            <Icon name="x" color="neutralTextWeak" />
          </Button>
        </Header>
        <Content>
          <Notice>
            지역은 최소 1개,
            <br /> 최대 2개까지 설정 가능해요.
          </Notice>
          <Buttons>
            <Location>
              역삼 1동
              <Button styledType="ghost" onClick={() => setIsAlertOpen(true)}>
                <Icon name="circleXFilled" color="accentText" />
              </Button>
            </Location>
            <Button styledType="outline" color="neutralBorder">
              <Plus>
                <Icon name="plus" color="accentTextWeak" />
                추가
              </Plus>
            </Button>
          </Buttons>
        </Content>
      </Modal>
      {isAlertOpen && (
        <Alert
          isOpen={isOpen}
          onClose={() => setIsAlertOpen(false)}
          onAction={() => {
            console.log('동네 삭제 완료!');
          }}
        >
          동네를 삭제할까요?
        </Alert>
      )}
    </>
  );
}

const Header = styled.header`
  min-height: 72px;
  display: flex;
  padding: 8px 8px 16px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Headline = styled.h2`
  font: ${({ theme }) => theme.font.displayStrong20};
`;

const Content = styled.div`
  display: flex;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  flex: 1;
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
  width: 288px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px 16px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.accentPrimary};
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentText};
`;

const Plus = styled.div`
  width: 254px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.accentTextWeak};
`;
