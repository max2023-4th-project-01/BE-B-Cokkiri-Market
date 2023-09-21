package kr.codesquad.item.dto.vo;

import java.time.ZonedDateTime;

import kr.codesquad.util.ItemStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ItemListVo {
	private Long id;
	private String title;
	private Long userId;
	private String locationName;
	private ZonedDateTime createdAt;
	private ItemStatus status;
	private Integer price;
	private String thumbnailUrl;
	private Long chat;
	private Long favorite;
	private int view;

	@Builder
	public ItemListVo(Long id, String title, Long userId, String locationName, ZonedDateTime createdAt,
		ItemStatus status, Integer price, String thumbnailUrl, Long chat, Long favorite, int view) {
		this.id = id;
		this.title = title;
		this.userId = userId;
		this.locationName = locationName;
		this.createdAt = createdAt;
		this.status = status;
		this.price = price;
		this.thumbnailUrl = thumbnailUrl;
		this.chat = chat;
		this.favorite = favorite;
		this.view = view;
	}
}
