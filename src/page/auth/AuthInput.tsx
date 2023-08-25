import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

type AuthInputProps = {
  id: string;
  password: string;
  onChangeId: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function AuthInput({
  id,
  password,
  onChangeId,
  onChangePassword,
}: AuthInputProps) {
  return (
    <>
      <InputWrapper>
        <Label>아이디</Label>
        <input
          placeholder="내용을 입력해 주세요"
          value={id}
          onChange={onChangeId}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>비밀번호</Label>
        <input
          placeholder="내용을 입력해 주세요"
          value={password}
          type="password"
          onChange={onChangePassword}
        />
      </InputWrapper>
    </>
  );
}

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & input {
    width: 100%;
    padding: 4px 12px;
    border: ${({ theme }) => `1px solid ${theme.color.neutralBorder}`};
    border-radius: 8px;
    font: ${({ theme }) => theme.font.availableDefault16};
  }
`;

const Label = styled.div`
  width: 100%;
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;
