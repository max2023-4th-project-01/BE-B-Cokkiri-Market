import { styled } from 'styled-components';

export function AddLocation() {
  return (
    <>
      <SearchBar />
      <Content>지역들</Content>
    </>
  );
}

const SearchBar = styled.input`
  display: flex;
  width: 288px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Content = styled.div`
  display: flex;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  flex: 1;
`;
