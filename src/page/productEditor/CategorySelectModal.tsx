import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { getCategories } from '../../api/fetchers/itemFetcher';
import { Error } from '../../components/Error';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';

type CategoryData = {
  categories: CategoryItem[];
};

type CategoryItem = {
  id: number;
  name: string;
  iconName: string;
};

type ModalProps = {
  isOpen: boolean;
  selectedId?: number;
  selectCategory: (id: number, name: string) => void;
  onClose: () => void;
};

export function CategorySelectModal({
  isOpen,
  selectedId,
  selectCategory,
  onClose,
}: ModalProps) {
  const {
    data: categoryData,
    isLoading,
    isError,
  } = useQuery<CategoryData>(['category'], getCategories);
  const select = (id: number, name: string) => {
    selectCategory(id, name);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Header>
        <Headline>동네 추가</Headline>
        <Button styledType="text" onClick={onClose}>
          <Icon name="x" color="neutralTextStrong" />
        </Button>
      </Header>
      <Body>
        <Container>
          {isLoading ? (
            <Loader />
          ) : (
            <Content>
              {categoryData?.categories?.map(category => {
                return (
                  <Category
                    key={category.id}
                    $select={selectedId === category.id}
                    onClick={() => select(category.id, category.name)}
                  >
                    {category.name}
                  </Category>
                );
              })}
            </Content>
          )}
          {isError && <Error message="카테고리 목록을 불러오지 못했습니다." />}
        </Container>
      </Body>
    </Modal>
  );
}
const Header = styled.header`
  min-height: 72px;
  display: flex;
  padding: 8px 8px 16px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  transition: padding 0.4s ease-in-out;
`;

const Headline = styled.h2`
  font: ${({ theme }) => theme.font.displayStrong20};
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Container = styled.div<{ $rightPosition?: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 24px 16px;
  position: absolute;
  top: 0;
  ${({ $rightPosition }) =>
    $rightPosition !== undefined && `right: ${$rightPosition}px`};
  transition: right 0.6s;
  font: ${({ theme }) => theme.font.displayDefault16};
  background-color: ${({ theme }) => theme.color.neutralBackground};
`;

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex: 1;
  overflow-y: scroll;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.neutralBorderStrong};
    border-radius: 10px;
  }
`;

const Category = styled.li<{ $select?: boolean }>`
  display: flex;
  padding: 16px 0px 15px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.color.neutralBorder};
  cursor: pointer;

  font: ${({ $select, theme }) => ($select ? theme.font.enabledStrong16 : '')};
  color: ${({ $select, theme }) =>
    $select ? theme.color.neutralTextStrong : ''};

  &:hover {
    background-color: ${({ theme }) => theme.color.neutralBackgroundBold};
  }
`;
