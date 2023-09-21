import { usePatchItemStatus } from '../../api/queries/useItemQuery';
import {
  ProductData,
  useProductEditorStore,
} from '../../stores/useProductEditorStore';
import { useToastStore } from '../../stores/useToastStore';
import { Dropdown } from './Dropdown';
import { MenuItem } from './MenuItem';

type ProductItemDropdownProps = {
  data?: ProductData;
  itemId: number;
  status: string;
  isError: boolean;
  isLoading: boolean;
  renderingPosition: 'home' | 'favorites' | 'salesList';
  openAlert: () => void;
};

export function ProductItemDropdown({
  data,
  itemId,
  status,
  isError,
  isLoading,
  renderingPosition,
  openAlert,
}: ProductItemDropdownProps) {
  const showToast = useToastStore(state => state.showToast);
  const openEditorPanel = useProductEditorStore(state => state.openPanel);

  const statusMutation = usePatchItemStatus(renderingPosition);

  const editItem = () => {
    if (!data || isLoading) {
      showToast({
        mode: 'warning',
        message: '문제 발생! 다시 시도해 주세요!',
      });
      return;
    } else if (isError) {
      showToast({
        mode: 'error',
        message: '에러 발생!',
      });
      return;
    }
    openEditorPanel({ mode: 'edit', data: data, id: itemId });
  };

  const changeStatusToReserved = () => {
    statusMutation.mutate({
      itemId,
      statusName: '예약중',
    });
  };

  const changeStatusToSold = () => {
    statusMutation.mutate({
      itemId,
      statusName: '판매완료',
    });
  };

  const changeStatusToOnSale = () => {
    statusMutation.mutate({
      itemId,
      statusName: '판매중',
    });
  };

  const statusMenuItemList = [
    {
      status: '판매중',
      action: changeStatusToOnSale,
      label: '판매중 상태로 전환',
    },
    {
      status: '예약중',
      action: changeStatusToReserved,
      label: '예약중 상태로 전환',
    },
    {
      status: '판매완료',
      action: changeStatusToSold,
      label: '판매완료 상태로 전환',
    },
  ];

  return (
    <Dropdown iconName="dots" align="right">
      <MenuItem onAction={editItem}>게시글 수정</MenuItem>
      {statusMenuItemList.map(
        ({ status: itemStatus, action, label }) =>
          status !== itemStatus && (
            <MenuItem key={itemStatus} onAction={action}>
              {label}
            </MenuItem>
          )
      )}
      <MenuItem color="systemWarning" onAction={openAlert}>
        삭제
      </MenuItem>
    </Dropdown>
  );
}
