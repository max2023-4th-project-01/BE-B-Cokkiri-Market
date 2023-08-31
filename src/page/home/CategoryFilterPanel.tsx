import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getCategories } from '../../api/fetcher';
import { Button } from '../../components/Button';
import { Icon } from '../../components/icon/Icon';
import { IconsType } from '../../components/icon/icons';

type CategoryFilterPanelProps = {
  closePanel: () => void;
};

type CategoryData = {
  id: number;
  name: string;
  iconName: IconsType;
};

export function CategoryFilterPanel({ closePanel }: CategoryFilterPanelProps) {
  const [rightPosition, setRightPosition] = useState(-392);
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
    setRightPosition(-392);
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
      <Header>
        <Button styledType="ghost" onClick={onClose}>
          <ButtonDiv>
            <Icon name="chevronLeft" color="neutralTextStrong" />
            뒤로
          </ButtonDiv>
        </Button>
        <Title>카테고리</Title>
      </Header>
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

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 54px;
  padding: 0 8px;
  border-bottom: ${({ theme }) => `0.8px solid ${theme.color.neutralBorder}`};
  background: ${({ theme }) => theme.color.neutralBackgroundBlur};
`;

const Title = styled.div`
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font: ${({ theme }) => theme.font.displayStrong16};
  color: ${({ theme }) => theme.color.neutralTextStrong};
`;

const ButtonDiv = styled.div`
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
