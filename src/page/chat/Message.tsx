import { css, styled } from 'styled-components';

export function Message({
  content,
  isSent,
}: {
  content: string;
  isSent: boolean;
}) {
  return (
    <Container $isSent={isSent}>
      <Content $isSent={isSent}>{content}</Content>
    </Container>
  );
}

const Container = styled.div<{ $isSent: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isSent }) => ($isSent ? 'right' : 'left')};
`;

const setColor = (isSent: boolean) => {
  return css`
    color: ${({ theme }) =>
      isSent ? theme.color.accentText : theme.color.neutralTextStrong};
    background: ${({ theme }) =>
      isSent ? theme.color.accentPrimary : theme.color.neutralBackgroundBold};
  `;
};

const Content = styled.div<{ $isSent: boolean }>`
  max-width: 256px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.color.neutralTextStrong};
  font: ${({ theme }) => theme.font.displayDefault16};
  border-radius: 16px;
  ${({ $isSent }) => setColor($isSent)};
`;
