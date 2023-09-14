export type ItemData = {
  userLocation: string;
  categoryName: string | null;
  items: ItemProps[];
  nextCursor: number | null;
};

export type ItemBaseType = {
  id: number;
  title: string;
  locationName: string;
  createdAt: Date;
  statusName: string;
  price: number | null;
  countData: {
    chat: number;
    favorite: number;
  };
  thumbnailUrl: string;
};

export type ItemProps = ItemBaseType & {
  isSeller: boolean;
};

export type UserLocationData = {
  locations: {
    id: number;
    name: string;
    isSelected: boolean;
  }[];
};

export type LocationData = {
  id: number;
  item: string;
}[];

export type LocationResultData = {
  locations: {
    id: number;
    name: string;
  }[];
  nextPage: number | null;
};

export type FavoritesCategoryTabsType = {
  id?: number;
  name: string;
};

export type FavoritesCategoryDataType = {
  categories: FavoritesCategoryTabsType[];
};

export type CategoryData = {
  categories: CategoryItem[];
};

export type CategoryItem = {
  id: number;
  name: string;
  iconName: string;
};
