import { styled } from 'styled-components';
import { addCommasToNumber } from '../utils/addCommasToNumber';
import { getElapsedSince } from '../utils/getElapsedSince';
import { Badge } from './Badge';
import { Icon } from './icon/Icon';

type ItemProps = {
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
  isSeller: boolean;
};

export function ProductItem({
  id,
  title,
  locationName,
  createdAt,
  statusName,
  price,
  countData,
  thumbnailUrl,
  isSeller,
}: ItemProps) {
  const { chat, favorite } = countData;

  const setPrice = (price: number | null) => {
    switch (price) {
      case null:
        return '가격 미정';
      case 0:
        return '나눔';
      default:
        return `${addCommasToNumber(price)}원`;
    }
  };

  return (
    <Div
      onClick={() => {
        console.log(id);
      }}
    >
      <Thumbnail src={thumbnailUrl} />
      <Information>
        <Title>
          <span>{title}</span>
          {isSeller && <Icon name="dots" color="neutralTextStrong" />}
        </Title>
        <LocationAndTimestamp>
          {locationName}・{getElapsedSince(createdAt)}
        </LocationAndTimestamp>
        <StateAndPrice>
          {statusName !== '' && (
            <Badge
              type="container"
              size="S"
              text={statusName}
              fontColor="accentText"
              badgeColor="accentSecondary"
            />
          )}
          <Price>{setPrice(price)}</Price>
        </StateAndPrice>
        <History>
          {chat > 0 && (
            <CountWrapper>
              <Icon name="message" color="neutralTextWeak" />
              {chat}
            </CountWrapper>
          )}
          {favorite > 0 && (
            <CountWrapper>
              <Icon name="heart" color="neutralTextWeak" />
              {chat}
            </CountWrapper>
          )}
        </History>
      </Information>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 152px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.color.neutralBorder}`};
`;

const Information = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  gap: 4px;

  & > div {
    width: 100%;
    display: flex;
  }
`;

const Title = styled.div`
  font: ${({ theme }) => theme.font.displayDefault16};
  color: ${({ theme }) => theme.color.neutralText};

  & span {
    flex: 1;
  }
`;

const LocationAndTimestamp = styled.div`
  font: ${({ theme }) => theme.font.displayDefault12};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;

const StateAndPrice = styled.div`
  gap: 4px;
`;

const Price = styled.div`
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const History = styled.div`
  display: flex;
  justify-content: right;
  align-items: end;
  flex: 1;
  gap: 4px;
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.font.displayDefault12};
  color: ${({ theme }) => theme.color.neutralTextWeak};
`;
