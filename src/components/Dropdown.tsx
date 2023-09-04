import { styled } from 'styled-components';
import { Button } from './Button';

export function Dropdown() {
  return (
    <Container>
      <Menu>
        <ListItem>
          <Button styledType="ghost">
            <Text>역삼 1동</Text>
          </Button>
        </ListItem>
        <ListItem>
          <Button styledType="ghost">
            <Text>내 동네 설정하기</Text>
          </Button>
        </ListItem>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;
const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ListItem = styled.li`
  width: 240px;
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.neutralBackgroundBlur};
  }
`;
const Text = styled.div`
  font: ${({ theme }) => theme.font.availableDefault16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;
