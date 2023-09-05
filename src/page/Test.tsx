import { styled } from 'styled-components';
import { Button } from '../components/button/Button';
import { Icon } from '../components/icon/Icon';

export function Test() {
  return (
    <Div>
      <Button
        color="accentPrimary"
        fontColor="accentText"
        align="space-between"
      >
        역삼 1동
        <Icon name="circleXFilled" color="accentText" />
      </Button>
      <Button
        styledType="outline"
        color="neutralBorder"
        fontColor="accentTextWeak"
        align="center"
        disabled
      >
        <Icon name="plus" color="accentTextWeak" />
        추가
      </Button>
      <Button styledType="circle" color="accentPrimary">
        <Icon name="plus" color="accentText" />
      </Button>
      <Button size="M" styledType="circle" color="accentPrimary">
        <Icon name="send" size={16} color="accentText" />
      </Button>
      <Button
        style={{ height: '42px' }}
        size="L"
        styledType="outline"
        color="neutralText"
      >
        <Icon name="octocat" color="accentText" />
        GitHub 로그인
      </Button>

      <Button styledType="text" size="L" disabled>
        닫기
      </Button>
      <Button styledType="text" size="L">
        완료
      </Button>
      <Button styledType="text" size="L">
        <Icon name="chevronLeft" color="neutralText" />
        뒤로
      </Button>
      <Button styledType="text" size="L">
        <Icon name="mapPinFilled" color="neutralText" />
        역삼 1동
      </Button>
      <Button styledType="text" size="M">
        회원가입
      </Button>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 0 32px;
`;
