import { styled } from 'styled-components';
import pepe from '../assets/image/pepe.png';

export function Error() {
  return (
    <Wrapper>
      <DefaultImage src={pepe} />
      <Info>에상치 못한 에러가 발생했습니다.</Info>
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
  width: 128px;
`;

const Info = styled.p`
  font: ${({ theme }) => theme.font.displayStrong16};
`;
