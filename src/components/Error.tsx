import { styled } from 'styled-components';
import sadElephant from '../assets/image/sad_elephant.png';

export function Error() {
  return (
    <Wrapper>
      <Info>에상치 못한 에러가 발생했습니다.</Info>
      <DefaultImage src={sadElephant} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const DefaultImage = styled.img`
  width: 256px;
`;

const Info = styled.p`
  font: ${({ theme }) => theme.font.displayStrong16};
`;
