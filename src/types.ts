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
  nextCursor: number | null;
};
