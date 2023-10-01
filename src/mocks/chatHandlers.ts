import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';
import { ChattingItemType } from '../page/chat/ChattingItem';

export const chatHandlers = [
  rest.get(API_ENDPOINT.CHAT_ROOMS, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(chatRooms));
  }),
  rest.get(`${API_ENDPOINT.CHAT_ROOMS}/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.status(200), ctx.json(chatRoom[Number(id)]));
  }),
];

const chatRooms: ChattingItemType[] = [
  {
    id: 0,
    chattingMember: {
      memberId: 1,
      profileImgUrl: 'https://avatars.githubusercontent.com/u/97204689?v=4',
      memberName: '지안',
    },
    latestMessage:
      '안녕하세요! 한 가지 궁금한 점이 있어서 챗 드려요~~~~~~~~~~~~~~~~~',
    unread: 1,
    updateTime: new Date('2023-07-30T14:22:23'),
    item: {
      itemId: 1,
      itemImgUri:
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
  },
  {
    id: 1,
    chattingMember: {
      memberId: 2,
      profileImgUrl: 'https://avatars.githubusercontent.com/u/76121068?v=4',
      memberName: 'fuze',
    },
    latestMessage: '애눌좀 해주세요',
    unread: 3,
    updateTime: new Date('2023-07-30T14:22:23'),
    item: {
      itemId: 2,
      itemImgUri:
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
  },
];

const chatRoom = [
  {
    item: {
      itemId: 1,
      title: '얼마 안 쓴 가방팝니다.',
      price: '169,000',
      statusTag: '판매중',
      itemImgUri:
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
    chattingMember: {
      memberId: 2,
      memberName: '지안',
    },
    messages: [
      {
        messageId: 124,
        isSent: false,
        content:
          '안녕하세요! 한 가지 궁금한 점이 있어서 챗 드려요~~~~~~~~~~~~~~~~~',
      },
    ],
  },
  {
    item: {
      itemId: 1,
      title: '얼마 안 쓴 가방팝니다.',
      price: '169,000',
      statusTag: '판매중',
      itemImgUri:
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
    chattingMember: {
      memberId: 2,
      memberName: 'fuze',
    },
    messages: [
      {
        messageId: 124,
        isSent: false,
        content: '팔렸나요?',
      },
      {
        messageId: 125,
        isSent: true,
        content: '아니요 아직 안 팔렸습니다.',
      },
      {
        messageId: 126,
        isSent: true,
        content: '직거래로 구매 하시나요?',
      },
      {
        messageId: 127,
        isSent: false,
        content: '넵 직거래 하려고 합니다.',
      },
      {
        messageId: 128,
        isSent: false,
        content: '근데 조금 비싼거 같은데',
      },
      {
        messageId: 129,
        isSent: false,
        content: '애눌좀 해주세요',
      },
    ],
  },
];
