import { styled } from 'styled-components';
import sadElephant from '../assets/image/sad_elephant.png';

export function Error({
  message = '예상치 못한 에러가 발생했습니다.',
}: {
  message?: string;
}) {
  return (
    <Wrapper>
      <DefaultImage src={sadElephant} />
      <Info>{message}</Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DefaultImage = styled.img`
  width: 256px;
`;

const Info = styled.p`
  font: ${({ theme }) => theme.font.displayStrong16};
`;
