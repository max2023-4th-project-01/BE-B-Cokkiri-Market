import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getCategories } from '../../api/fetcher';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Icon } from '../../components/icon/Icon';
import { IconsType } from '../../components/icon/icons';
import { useScreenConfigStore } from '../../stores/useScreenConfigStore';

type CategoryFilterPanelProps = {
  closePanel: () => void;
};

type CategoryData = {
  id: number;
  name: string;
  iconName: IconsType;
};

export function CategoryFilterPanel({ closePanel }: CategoryFilterPanelProps) {
  const { screenWidth } = useScreenConfigStore();
  const [rightPosition, setRightPosition] = useState(-screenWidth);
  const {
    data: categoryData,
    isLoading,
    isError,
  } = useQuery<CategoryData[], Error>(['category'], getCategories);

  useEffect(() => {
    setRightPosition(0);
  }, []);

  const onTransitionEndHandler = () => {
    rightPosition !== 0 && closePanel();
  };

  const onClose = () => {
    setRightPosition(-screenWidth);
  };

  const onClickCategory = (id: number) => {
    console.log(id);
    onClose();
  };

  if (isError) {
    return <div>error</div>;
  }

  return (
    <Div $right={rightPosition} onTransitionEnd={onTransitionEndHandler}>
      <Header
        leftButton={
          <Button styledType="ghost" onClick={onClose}>
            <ButtonDiv>
              <Icon name="chevronLeft" color="neutralTextStrong" />
              <span>뒤로</span>
            </ButtonDiv>
          </Button>
        }
        title="카테고리"
      />
      {isLoading && <div>Loading...</div>}
      {!isLoading && categoryData && (
        <Body>
          {categoryData.map((category, index) => {
            return (
              <Category
                key={index}
                onClick={() => onClickCategory(category.id)}
              >
                <CategoryIcon>
                  <Icon name={category.iconName} color="neutralTextStrong" />
                </CategoryIcon>
                <span>{category.name}</span>
              </Category>
            );
          })}
        </Body>
      )}
    </Div>
  );
}

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

const ButtonDiv = styled.div`
  width: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font: ${({ theme }) => theme.font.availableStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
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
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
