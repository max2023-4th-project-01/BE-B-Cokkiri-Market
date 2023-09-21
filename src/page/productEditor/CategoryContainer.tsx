import { styled } from 'styled-components';
import { Badge, BadgeProps } from '../../components/Badge';
import { Button } from '../../components/button/Button';
import { Icon } from '../../components/icon/Icon';
import { FavoritesCategoryTabsType } from '../../types';
import { CategoryData } from './ProductEditorPanel';

type CategoryContainerProps = {
  recommendCategory: CategoryData;
  selectedCategoryId?: number;
  openModal: () => void;
  setCategoryId: (id?: number) => void;
};

export function CategoryContainer({
  recommendCategory,
  selectedCategoryId,
  openModal,
  setCategoryId,
}: CategoryContainerProps) {
  const getBadgeOption = (category: FavoritesCategoryTabsType) => {
    const isSelected = category.id === selectedCategoryId;
    const options: BadgeProps = {
      size: 'M',
      type: isSelected ? 'container' : 'outline',
      text: category.name,
      badgeColor: isSelected ? 'accentPrimary' : 'neutralBorder',
      fontColor: isSelected ? 'accentText' : 'accentTextWeak',
      onClick: () => setCategoryId(category.id),
    };

    return options;
  };

  return (
    <CategoryWrapper>
      <BadgeWrapper>
        {recommendCategory?.categories.map(category => (
          <Badge key={category.id} {...getBadgeOption(category)} />
        ))}
      </BadgeWrapper>
      <Button style={{ padding: 0 }} styledType="text" onClick={openModal}>
        <Icon name="chevronRight" color="accentTextWeak" />
      </Button>
    </CategoryWrapper>
  );
}

const CategoryWrapper = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgeWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
  padding: 5px 0;
  white-space: nowrap;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.color.neutralBorderStrong};
    border-radius: 10px;
  }
`;
