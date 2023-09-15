import { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

type ProductContentProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function ProductContent(props: ProductContentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    onInput();
  }, []);

  return (
    <Wrapper>
      <CustomTextArea
        ref={textareaRef}
        onInput={onInput}
        {...props}
      ></CustomTextArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const CustomTextArea = styled.textarea`
  min-width: 100%;
  min-height: 125px;
  border: none;
  color: ${({ theme }) => theme.color.neutralTextWeak};
  font: ${({ theme }) => theme.font.availableDefault16};
  overflow-y: hidden;
  resize: none;
`;
