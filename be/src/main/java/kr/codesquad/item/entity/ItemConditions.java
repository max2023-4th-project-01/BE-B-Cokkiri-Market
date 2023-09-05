package kr.codesquad.item.entity;

import org.springframework.data.domain.Slice;

import kr.codesquad.item.dto.vo.ItemListVo;
import kr.codesquad.item.repository.ItemPaginationRepository;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemConditions {
	private final ItemPaginationRepository itemPaginationRepository;
	private final Long itemId;
	private final String locationName;
	private final Long categoryId;
	private final int pageSize;
	private final Boolean isSold;
	private final Long userId;
	private final Boolean isFavorite;

	public Slice<ItemListVo> findItems() {
		return itemPaginationRepository.readByConditions(itemId, locationName, categoryId, isSold, userId, isFavorite,
			pageSize);
	}
}
