import { rest } from 'msw';
import { API_ENDPOINT } from '../api/endPoint';
import { ItemData } from '../types';
import { fakeItems, fakeSellItems } from './faker';

type PatchFavoriteRequestBody = {
  isFavorite: boolean;
};

export const itemsHandlers = [
  rest.get(API_ENDPOINT.ITEMS, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(homeData));
  }),

  rest.get(API_ENDPOINT.CATEGORIES, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoryData));
  }),

  rest.get(`${API_ENDPOINT.ITEMS}/:itemId`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(ItemDetailsData));
  }),

  rest.patch<PatchFavoriteRequestBody>(
    `${API_ENDPOINT.ITEMS}/:itemId/favorites`,
    (req, res, ctx) => {
      ItemDetailsData = {
        ...ItemDetailsData,
        isFavorite: req.body.isFavorite,
      };

      return res(
        ctx.status(200),
        ctx.json({ isFavorite: req.body.isFavorite })
      );
    }
  ),

  rest.get(API_ENDPOINT.SALES_LIST('testUser'), (req, res, ctx) => {
    const isSoldParams = req.url.searchParams.get('isSold');

    if (!isSoldParams) {
      return res(ctx.status(200), ctx.json(sellHistoryData));
    }

    const isSold = isSoldParams === 'true';
    const newItems = sellHistoryData.items.filter(item => {
      return isSold
        ? item.statusName === '판매완료'
        : item.statusName === '판매중';
    });

    return res(
      ctx.status(200),
      ctx.json({ ...sellHistoryData, items: newItems })
    );
  }),
  rest.get(API_ENDPOINT.FAVORITES_CATEGORY, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoryData));
  }),
  rest.get(API_ENDPOINT.FAVORITES, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(sellHistoryData));
  }),
];

const homeData: ItemData = {
  userLocation: '서울특별시 강남구 역삼1동',
  categoryName: null,
  items: [
    {
      id: 1,
      title: '글제목',
      locationName: '역삼 1동',
      createdAt: new Date('2023-08-28T23:04:33'),
      statusName: '예약중',
      price: 10000,
      countData: {
        chat: 10,
        favorite: 10,
      },
      thumbnailUrl:
        'https://www.ikea.com/kr/ko/images/products/alex-storage-unit-white__1209817_pe909458_s5.jpg?f=xl',
      isSeller: true,
    },
    ...fakeItems(),
  ],
  nextCursor: 1,
};

const sellHistoryData = {
  items: [
    {
      id: 1,
      title: '글제목',
      locationName: '역삼 1동',
      createdAt: new Date('2023-08-28T23:04:33'),
      statusName: '예약중',
      price: 10000,
      countData: {
        chat: 10,
        favorite: 10,
      },
      thumbnailUrl:
        'https://www.ikea.com/kr/ko/images/products/alex-storage-unit-white__1209817_pe909458_s5.jpg?f=xl',
    },
    ...fakeSellItems(),
  ],
  nextCursor: 1,
};

const categoryData = {
  categories: [
    {
      id: 1,
      name: '디지털기기',
      iconName: 'icon_digital',
    },
    {
      id: 2,
      name: '생활가전',
      iconName: 'icon_appliance',
    },
    {
      id: 3,
      name: '가구/인테리어',
      iconName: 'icon_furniture',
    },
    {
      id: 4,
      name: '생활/주방',
      iconName: 'icon_kitchen',
    },
    {
      id: 5,
      name: '유아동',
      iconName: 'icon_baby',
    },
    {
      id: 6,
      name: '유아도서',
      iconName: 'icon_book',
    },
    {
      id: 7,
      name: '여성의류',
      iconName: 'icon_clothes',
    },
    {
      id: 8,
      name: '여성잡화',
      iconName: 'icon_accessories',
    },
    {
      id: 9,
      name: '남성패션/잡화',
      iconName: 'icon_man',
    },
    {
      id: 10,
      name: '뷰티/미용',
      iconName: 'icon_beauty',
    },
    {
      id: 11,
      name: '스포츠/레저',
      iconName: 'icon_sports',
    },
    {
      id: 12,
      name: '취미/게임/음반',
      iconName: 'icon_hobby',
    },
    {
      id: 13,
      name: '중고차',
      iconName: 'icon_car',
    },
    {
      id: 14,
      name: '티켓/교환권',
      iconName: 'icon_ticket',
    },
    {
      id: 15,
      name: '가공식품',
      iconName: 'icon_food',
    },
    {
      id: 16,
      name: '반려동물식품',
      iconName: 'icon_pet',
    },
    {
      id: 17,
      name: '식물',
      iconName: 'icon_plant',
    },
    {
      id: 18,
      name: '기타 중고물품',
      iconName: 'icon_etc',
    },
  ],
};

let ItemDetailsData = {
  isSeller: true,
  images: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1591534577302-1696205bb2bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
    },
  ],
  seller: 'fusefuse',
  status: [
    { name: '판매중', isSelected: true },
    { name: '예약중', isSelected: false },
    { name: '판매완료', isSelected: false },
  ],
  title: '얼마 안 쓴 가방팝니다.',
  categoryName: '남성패션/잡화',
  createdAt: '2023-07-14T23:05:33',
  content:
    '안녕하세요! 저는 중고 백팩을 판매하고 있습니다. 이 백팩은 특별한 이야기가 담겨 있어요. 몇 년 전, 이 백팩은 제게 가장 믿음직한 친구처럼 함께 여행하고 모험을 나누었습니다. 이 백팩과 함께 저는 국내외 다양한 여행을 떠나며 산과 바다, 도시와 숲을 넘나들었습니다. 이 백팩은 언제나 편안하고 믿음직스러웠죠. 하지만 지금은 새로운 모험을 찾아 떠나야 할 때입니다. 그래서 제 친구인 이 백팩을 새로운 주인을 찾고자 합니다. 이 백팩은 여행의 기억과 함께 다른 사람의 모험을 돕기 위해 준비되어 있습니다.',
  countData: {
    chat: 0,
    favorite: 3,
    view: 5,
  },
  isFavorite: false,
  price: 99000,
};
