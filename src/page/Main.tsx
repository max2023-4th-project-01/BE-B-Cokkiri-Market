import { styled } from 'styled-components';
import { countStore } from '../store';

export function Main() {
  const { count } = countStore();

  return (
    <Div>
      메인
      <div>count : {count}</div>
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
`;
