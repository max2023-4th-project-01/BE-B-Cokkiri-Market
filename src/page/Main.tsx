import { styled } from 'styled-components';

export function Main() {
  return <Div>메인</Div>;
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
