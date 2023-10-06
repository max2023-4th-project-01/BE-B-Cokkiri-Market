import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useGetChatRoom } from '../../api/queries/useChatQuery';
import { Error } from '../../components/Error';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';
import { useInput } from '../../hooks/useInput';
import { useStomp } from '../../hooks/useWebSocket';
import { usePanelStore } from '../../stores/usePanelStore';
import { priceToString } from '../../utils/priceToString';
import { Message } from './Message';

export type ChatRoomType = {
  item: {
    id: number;
    title: string;
    price: number | null;
    status: string;
    thumbnailUrl: string;
  };
  chatMember: {
    nickname: string;
  };
  messages: MessageType[];
};

export type MessageType = {
  id: number;
  isSent: boolean;
  content: string;
};

export function ChatRoom({ chatRoomId }: { chatRoomId: number }) {
  const { closePanel } = usePanelStore();
  const { data, isError, isLoading } = useGetChatRoom(chatRoomId);
  const [messages, setMessages] = useState<MessageType[]>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const message = useInput('');

  const onMessage = useCallback((message: MessageType) => {
    setMessages(prev => [
      ...(prev || []),
      { id: message.id, isSent: message.isSent, content: message.content },
    ]);
  }, []);

  const { connectWS, closeWS, sendMessage } = useStomp(onMessage);

  useEffect(() => {
    connectWS(chatRoomId);
  }, [connectWS, chatRoomId]);

  useEffect(() => {
    return closeWS;
  }, [closeWS]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  const onSend = () => {
    if (message.value) {
      sendMessage(message.value, chatRoomId);
      message.clearValue();
    }
  };

  const onClose = () => {
    closePanel();
    closeWS();
  };

  const onKeyUpEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  return (
    <Container>
      <Header
        leftButton={
          <Button styledType="text" onClick={onClose}>
            <Icon name="chevronLeft" color="neutralTextStrong" />
            <span>뒤로</span>
          </Button>
        }
        title={data?.chatMember.nickname}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Body>
          <ProductInfoBanner>
            <ProductImage src={data?.item.thumbnailUrl} />
            <div>
              <Title>{data?.item.title}</Title>
              <Price>{priceToString(data?.item.price)}</Price>
            </div>
          </ProductInfoBanner>
          <Messages ref={messagesEndRef}>
            {messages?.map((message, index) => (
              <Message
                key={index}
                content={message.content}
                isSent={message.isSent}
              />
            ))}
          </Messages>
          <ChatBar>
            <StyledInput
              placeholder="내용을내용을 입력하세요"
              onKeyDown={onKeyUpEnter}
              onChange={message.onChange}
              value={message.value}
            />
            <Button
              size="M"
              styledType="circle"
              color="accentPrimary"
              onClick={onSend}
            >
              <Icon size={16} name="send" color="accentText" />
            </Button>
          </ChatBar>
        </Body>
      )}
      {isError && <Error message="채팅방을 불러오지 못했습니다." />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 56px;
`;

const ProductInfoBanner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;
  border-bottom: 0.8px solid ${({ theme }) => theme.color.neutralBorder};
`;

const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: ${({ theme }) => theme.color.neutralTextStrong};
  font: ${({ theme }) => theme.font.displayDefault16};
`;

const Price = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.color.neutralTextStrong};
  font: ${({ theme }) => theme.font.displayStrong16};
`;

const Messages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  padding: 12px 16px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.neutralBorderStrong};
    border-radius: 10px;
  }
`;

const ChatBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 16px;
  gap: 10px;
  border-top: 1px solid ${({ theme }) => theme.color.neutralBorder};
  background: ${({ theme }) => theme.color.neutralBackgroundWeak};
`;

const StyledInput = styled.input`
  min-height: 32px;
  max-height: 104px;
  display: flex;
  align-items: flex-end;
  flex: 1;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.color.neutralBorder};
  background: ${({ theme }) => theme.color.neutralBackground};
  color: ${({ theme }) => theme.color.neutralTextWeak};
  font: ${({ theme }) => theme.font.availableDefault16};
`;
