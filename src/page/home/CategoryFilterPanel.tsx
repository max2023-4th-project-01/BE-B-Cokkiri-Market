import { memo, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useGetCategoryData } from '../../api/queries/useItemQuery';
import { categoryIconMap } from '../../assets/image';
import { Error } from '../../components/Error';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';
import { useScreenConfigStore } from '../../stores/useScreenConfigStore';

type CategoryFilterPanelProps = {
  closePanel: () => void;
  selectCategory: (id: number) => void;
  isOpenPanel: boolean;
};

export const CategoryFilterPanel = memo(
  ({ closePanel, selectCategory, isOpenPanel }: CategoryFilterPanelProps) => {
    const { screenWidth } = useScreenConfigStore();
    const [rightPosition, setRightPosition] = useState(
      isOpenPanel ? 0 : -screenWidth
    );

    const { data: categoryData, isLoading, isError } = useGetCategoryData();

    useEffect(() => {
      if (isOpenPanel) {
        setRightPosition(0);
      } else {
        setRightPosition(-screenWidth);
      }
    }, [isOpenPanel, screenWidth]);

    const onTransitionEndHandler = () => {
      rightPosition !== 0 && closePanel();
    };

    const onClose = () => {
      setRightPosition(-screenWidth);
    };

    const onClickCategory = (id: number) => {
      onClose();
      selectCategory(id);
    };

    return (
      <Div $right={rightPosition} onTransitionEnd={onTransitionEndHandler}>
        <Header
          leftButton={
            <Button styledType="text" onClick={onClose}>
              <Icon name="chevronLeft" color="neutralTextStrong" />
              <span>뒤로</span>
            </Button>
          }
          title="카테고리"
        />
        <Body>
          {isLoading ? (
            <Loader />
          ) : (
            categoryData?.categories?.map(category => {
              return (
                <Category
                  key={category.id}
                  onClick={() => onClickCategory(category.id)}
                >
                  <CategoryIcon>
                    <CategoryImg
                      src={categoryIconMap[category.iconName]}
                      alt={category.iconName}
                    />
                  </CategoryIcon>
                  <span>{category.name}</span>
                </Category>
              );
            })
          )}
          {isError && <Error message="카테고리 목록을 불러오지 못했습니다." />}
        </Body>
      </Div>
    );
  }
);

const Div = styled.div<{ $right: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: ${({ $right }) => `${$right}px`};
  display: flex;
  align-items: center;
  flex-direction: column;
  border: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  background: ${({ theme }) => theme.color.accentText};
  transition: right 0.6s;
  z-index: 10;
`;

const Body = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 32px;
  justify-content: center;
  align-items: center;
  grid-template-columns: 80px 80px 80px;
  flex: 1;
  padding: 40px;
  margin-top: 56px;

  @media (max-width: 375px) {
    grid-gap: 16px;
    padding: 20px;
  }
`;

const Category = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  & span {
    font: ${({ theme }) => theme.font.displayDefault12};
    color: ${({ theme }) => theme.color.neutralText};
  }
`;

const CategoryIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryImg = styled.img`
  width: 44px;
  height: 44px;
`;
