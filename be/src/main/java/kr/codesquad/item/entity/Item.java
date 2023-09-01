package kr.codesquad.item.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import kr.codesquad.item.dto.ItemRequest;
import kr.codesquad.item.dto.ItemResponse;
import kr.codesquad.core.util.ItemStatus;
import kr.codesquad.core.util.TimeStamped;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Item extends TimeStamped {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, length = 45)
	private String title;
	@Column(nullable = false, length = 1000)
	private String content;
	@Column(nullable = false)
	private Long categoryId;
	@Column(nullable = true)
	private Integer price;
	@Column(nullable = false, length = 45)
	private String locationName;
	@Column(nullable = false, length = 200)
	private String thumbnailUrl;
	@Column(nullable = false, length = 45)
	private ItemStatus status;
	@Column(nullable = false)
	private Long userId;
	@Column(nullable = true)
	private int viewCount;

	@Builder
	public Item(Long id, String title, String content, Long categoryId, Integer price, String locationName, String thumbnailUrl,
		ItemStatus status, Long userId, int viewCount) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.categoryId = categoryId;
		this.price = price;
		this.locationName = locationName;
		this.thumbnailUrl = thumbnailUrl;
		this.status = status;
		this.userId = userId;
		this.viewCount = viewCount;
	}

	public void update(ItemRequest.UpdateInDto item, String thumbnailUrl) {
		this.title = item.getTitle();
		this.categoryId = item.getCategoryId();
		this.price = item.getPrice();
		this.content = item.getContent();
		this.locationName = item.getLocationName();
		if (thumbnailUrl != null) {
			this.thumbnailUrl = thumbnailUrl;
		}
	}

	public ItemResponse.DetailOutDto.CountData countData(int chatCount, int favoriteCount) {
		return ItemResponse.DetailOutDto.CountData.builder()
			.chat(chatCount)
			.favorite(favoriteCount)
			.view(this.viewCount)
			.build();
	}
}
