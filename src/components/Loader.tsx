import { styled, keyframes } from 'styled-components';

export function Loader() {
  return (
    <Wrapper>
      <Indicator />
    </Wrapper>
  );
}

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #383636;
  border-radius: 50%;
  animation: ${spinner} 1.5s linear infinite;
`;
