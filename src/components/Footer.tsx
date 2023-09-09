import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Icon } from './icon/Icon';

export function Footer() {
  return (
    <FooterDiv>
      <Tab to="/">
        <Icon name="home" color="accentPrimary" />
        <Label>홈화면</Label>
      </Tab>
      <Tab to="/sellHistory">
        <Icon name="news" color="accentSecondary" />
        <Label>판매내역</Label>
      </Tab>
      <Tab to="/">
        <Icon name="heart" color="systemWarning" />
        <Label>관심상품</Label>
      </Tab>
      <Tab to="/test">
        <Icon name="check" color="accentTextWeak" />
        <Label>test</Label>
      </Tab>
      <Tab to="/myAccount">
        <Icon name="userCircle" color="neutralTextWeak" />
        <Label>내 계정</Label>
      </Tab>
    </FooterDiv>
  );
}

const FooterDiv = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
`;

const Tab = styled(Link)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
`;

const Label = styled.span`
  font: ${({ theme }) => theme.font.availableStrong10};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;
