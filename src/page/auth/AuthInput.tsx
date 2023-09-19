import { ChangeEvent, KeyboardEvent } from 'react';
import { styled } from 'styled-components';
import { isValid } from './authConstant';

type AuthInputProps = {
  id: string;
  password: string;
  nickname?: string;
  onChangeId: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
};

export function AuthInput({
  id,
  password,
  nickname,
  onChangeId,
  onChangePassword,
  onChangeNickname,
  onSubmit,
}: AuthInputProps) {
  const COMMON_LABEL = '영어와 숫자로 6~20자 입력해 주세요';
  const NICKNAME_LABEL = '한글, 영어, 숫자로 2~16자 입력해 주세요.';

  const isValidId = isValid(id, 'common');
  const isValidPassword = isValid(password, 'common');
  const isValidNickname = nickname && isValid(nickname, 'nickname');

  const shouldShowIdWarning = !isValidId && id !== '';
  const shouldShowPasswordWarning = !isValidPassword && password !== '';
  const shouldShowNicknameWarning = !isValidNickname && nickname !== '';

  const submit = () => {
    if (
      onSubmit &&
      isValidId &&
      isValidPassword &&
      (!nickname || (nickname && isValidNickname))
    ) {
      onSubmit();
    }
  };

  const onKeydownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submit();
    }
  };

  return (
    <>
      <InputWrapper>
        <Label>아이디</Label>
        <StyledInput
          maxLength={20}
          placeholder="내용을 입력해 주세요."
          value={id}
          onChange={onChangeId}
          onKeyDown={onKeydownEnter}
          $shouldShowWarring={shouldShowIdWarning}
        />
        {shouldShowIdWarning && <WarningLabel>{COMMON_LABEL}</WarningLabel>}
      </InputWrapper>
      <InputWrapper>
        <Label>비밀번호</Label>
        <StyledInput
          maxLength={20}
          placeholder="내용을 입력해 주세요."
          value={password}
          type="password"
          onChange={onChangePassword}
          onKeyDown={onKeydownEnter}
          $shouldShowWarring={shouldShowPasswordWarning}
        />
        {shouldShowPasswordWarning && (
          <WarningLabel>{COMMON_LABEL}</WarningLabel>
        )}
      </InputWrapper>
      {nickname !== undefined && onChangeNickname && (
        <InputWrapper>
          <Label>닉네임</Label>
          <StyledInput
            maxLength={16}
            placeholder="내용을 입력해 주세요."
            value={nickname}
            onChange={onChangeNickname}
            onKeyDown={onKeydownEnter}
            $shouldShowWarring={shouldShowNicknameWarning}
          />
          {shouldShowNicknameWarning && (
            <WarningLabel>{NICKNAME_LABEL}</WarningLabel>
          )}
        </InputWrapper>
      )}
    </>
  );
}

const InputWrapper = styled.div`
  width: 100%;
  height: 91px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  width: 100%;
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const StyledInput = styled.input<{ $shouldShowWarring: boolean }>`
  width: 100%;
  padding: 4px 12px;
  border: ${({ theme, $shouldShowWarring }) =>
    `1px solid ${
      $shouldShowWarring ? theme.color.systemWarning : theme.color.neutralBorder
    }`};
  border-radius: 8px;
  font: ${({ theme }) => theme.font.availableDefault16};
`;

const WarningLabel = styled.span`
  font: ${({ theme }) => theme.font.availableStrong12};
  color: ${({ theme }) => theme.color.systemWarning};
`;
