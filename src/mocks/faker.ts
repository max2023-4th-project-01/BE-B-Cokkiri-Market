import { faker } from '@faker-js/faker';
import { icons } from '../components/icon/icons';

const thumbnailList = [
  'https://www.ikea.com/kr/ko/images/products/alex-storage-unit-white__1209817_pe909458_s5.jpg?f=xl',
  'https://www.ikea.com/kr/ko/images/products/idanaes-coffee-table-white__1161069_pe889277_s5.jpg?f=xl',
  'https://www.ikea.com/kr/ko/images/products/knarrevik-bedside-table-bright-blue__1172595_pe893387_s5.jpg?f=xl',
  'https://www.ikea.com/kr/ko/images/products/idanaes-high-cabinet-w-gls-drs-and-1-drawer-dark-brown-stained__1008948_pe827389_s5.jpg?f=xl',
];

// 무한 스크롤 목 데이터 구현 필요
export const fakeItems = () => {
  const items = [];
  for (let i = 2; i <= 20; i++) {
    const item = {
      id: i,
      title: faker.lorem.words(3),
      locationName: '역삼 1동',
      createdAt: faker.date.past(),
      statusName: faker.helpers.arrayElement(['예약중', '판매중', '판매완료']),
      price: i * 1000,
      countData: {
        chat: faker.number.int({ min: 1, max: 100 }),
        favorite: faker.number.int({ min: 1, max: 100 }),
      },
      thumbnailUrl: faker.helpers.arrayElement(thumbnailList),
      isSeller: faker.datatype.boolean(),
    };
    items.push(item);
  }

  return items;
};

export const fakeCategories = () => {
  const categories = [];
  for (let i = 0; i < 18; i++) {
    const category = {
      id: i,
      name: faker.helpers.arrayElement(Object.keys(icons)),
      iconName: faker.helpers.arrayElement(Object.keys(icons)),
    };

    categories.push(category);
  }

  return categories;
};
