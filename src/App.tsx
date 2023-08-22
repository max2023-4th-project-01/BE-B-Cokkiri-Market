import styled from 'styled-components';

export function App() {
  return <Div>hello world!</Div>;
}

const Div = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font: ${({ theme }) => theme.font.displayStrong20};
  color: ${({ theme }) => theme.color.neutral.textStrong};
`;
