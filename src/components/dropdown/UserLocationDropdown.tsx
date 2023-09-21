import {
  useGetUserLocation,
  useSelectUserLocation,
} from '../../api/queries/useLocationQuery';
import { extractKeyName } from '../../utils/extractKeyName';
import { Dropdown } from './Dropdown';
import { MenuItem } from './MenuItem';

type UserLocationDropdownProps = {
  currentLocation: string | undefined;
  openModal: () => void;
};

export function UserLocationDropdown({
  currentLocation,
  openModal,
}: UserLocationDropdownProps) {
  const { data: userLocationData } = useGetUserLocation();
  const selectMutation = useSelectUserLocation();

  const selectLocation = (locationId: number, isSelected: boolean) => {
    if (isSelected) return;
    selectMutation.mutate(locationId);
  };

  return (
    <Dropdown
      btnText={extractKeyName(currentLocation) ?? '로딩중...'}
      iconName="chevronDown"
      align="left"
    >
      {userLocationData?.locations?.map(location => {
        return (
          <MenuItem
            key={location.id}
            isSelected={location.isSelected}
            onAction={() => {
              selectLocation(location.id, location.isSelected);
            }}
          >
            {location.name}
          </MenuItem>
        );
      })}
      <MenuItem onAction={openModal}>내 동네 설정하기</MenuItem>
    </Dropdown>
  );
}
