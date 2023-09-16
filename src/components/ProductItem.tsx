import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useGetItemDetailsEdit } from '../api/queries/useItemDetailsQuery';
import { useProductEditorStore } from '../stores/useProductEditorStore';
import { useToastStore } from '../stores/useToastStore';
import { addCommasToNumber } from '../utils/addCommasToNumber';
import { getElapsedSince } from '../utils/getElapsedSince';
import { Badge } from './Badge';
import { Dropdown } from './dropdown/Dropdown';
import { MenuItem } from './dropdown/MenuItem';
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
  const navigate = useNavigate();
  const showToast = useToastStore(state => state.showToast);
  const openEditorPanel = useProductEditorStore(state => state.openPanel);
  const { data, isError, isLoading, refetch } = useGetItemDetailsEdit(id);
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

  const hoverToFetch = () => {
    if (!data && !isError) {
      refetch();
    }
  };

  // TODO: 각 드롭다운 메뉴 아이템들에 맞는 액션 추가하기
  const dropdownActions = {
    edit: () => {
      if (!data || isLoading) {
        showToast({
          type: 'warning',
          message: '문제 발생! 다시 시도해 주세요!',
        });
        return;
      } else if (isError) {
        showToast({
          type: 'error',
          message: '에러 발생!',
        });
        return;
      }
      openEditorPanel({ mode: 'edit', data: data, id: id });
    },
    reserved: () => {
      console.log('예약중');
    },
    sold: () => {
      console.log('판매완료');
    },
    delete: () => {
      console.log('삭제');
    },
  };

  const showItemDetails = (itemid: number) => {
    navigate(`/items/${itemid}`);
  };

  return (
    <Div onClick={() => showItemDetails(id)}>
      <Thumbnail src={thumbnailUrl} />
      <Information>
        <Title>
          <span>{title}</span>
          {isSeller && (
            <div onMouseOver={hoverToFetch}>
              <Dropdown iconName="dots" align="right">
                <MenuItem onAction={dropdownActions['edit']}>
                  <div>게시글 수정</div>
                </MenuItem>
                <MenuItem onAction={dropdownActions['reserved']}>
                  예약중 상태로 전환
                </MenuItem>
                <MenuItem onAction={dropdownActions['sold']}>
                  판매완료 상태로 전환
                </MenuItem>
                <MenuItem
                  color="systemWarning"
                  onAction={dropdownActions['delete']}
                >
                  삭제
                </MenuItem>
              </Dropdown>
            </div>
          )}
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
              {favorite}
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
