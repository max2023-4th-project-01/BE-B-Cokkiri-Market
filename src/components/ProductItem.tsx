import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useGetItemDetailsEdit } from '../api/queries/useItemDetailsQuery';
import { useDeleteItem } from '../api/queries/useItemQuery';
import { getElapsedSince } from '../utils/getElapsedSince';
import { priceToString } from '../utils/priceToString';
import { Alert } from './Alert';
import { Badge } from './Badge';
import { ProductItemDropdown } from './dropdown/ProductItemDropdown';
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
  renderingPosition,
}: ItemProps & { renderingPosition: 'home' | 'favorites' | 'salesList' }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const { chat, favorite } = countData;
  const { data, isError, isLoading, refetch } = useGetItemDetailsEdit(id);
  const deleteMutation = useDeleteItem(renderingPosition);

  const hoverToFetch = () => {
    if (!data && !isError) {
      refetch();
    }
  };

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const deleteItem = () => {
    deleteMutation.mutate(id);
  };

  const showItemDetails = (itemid: number) => {
    navigate(`/items/${itemid}`, {
      state: { redirectedFrom: currentLocation },
    });
  };

  return (
    <Div onClick={() => showItemDetails(id)}>
      <Thumbnail src={thumbnailUrl} />
      <Information>
        <Title>
          <span>{title}</span>
          {isSeller && (
            <div onMouseOver={hoverToFetch}>
              <ProductItemDropdown
                data={data}
                itemId={id}
                isError={isError}
                isLoading={isLoading}
                status={statusName}
                openAlert={openAlert}
                renderingPosition={renderingPosition}
              />
            </div>
          )}
        </Title>
        <LocationAndTimestamp>
          {locationName}・{getElapsedSince(createdAt)}
        </LocationAndTimestamp>
        <StateAndPrice>
          {statusName !== '' && statusName !== '판매중' && (
            <Badge
              type="container"
              size="S"
              text={statusName}
              fontColor={
                statusName === '예약중' ? 'accentText' : 'accentTextWeak'
              }
              badgeColor={
                statusName === '예약중' ? 'accentSecondary' : 'neutralBorder'
              }
            />
          )}
          <Price>{priceToString(price)}</Price>
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
              {favorite}
            </CountWrapper>
          )}
        </History>
      </Information>
      {isAlertOpen && (
        <Alert
          isOpen={isAlertOpen}
          onClose={() => {
            setIsAlertOpen(false);
          }}
          onAction={deleteItem}
        >
          상품을 삭제하시겠습니까?
        </Alert>
      )}
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
  cursor: pointer;
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
    align-items: center;
  }
`;

const Title = styled.div`
  font: ${({ theme }) => theme.font.displayDefault16};
  color: ${({ theme }) => theme.color.neutralText};
  position: relative;

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
