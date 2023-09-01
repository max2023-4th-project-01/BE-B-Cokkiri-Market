package kr.codesquad.item.dto.response;

import java.util.ArrayList;
import java.util.List;

import kr.codesquad.util.ItemStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ItemStatusResponse {
	private String name;
	private Boolean isSelected;

	public static List<ItemStatusResponse> of(ItemStatus itemStatus) {
		List<ItemStatusResponse> statusDropdown = new ArrayList<>();
		for (ItemStatus status : ItemStatus.values()) {
			statusDropdown.add(
				new ItemStatusResponse(status.toString(), status.equals(itemStatus)));
		}
		return statusDropdown;
	}
}
