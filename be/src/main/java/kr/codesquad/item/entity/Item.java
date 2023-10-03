package kr.codesquad.item.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import kr.codesquad.item.dto.request.ItemStatusDto;
import kr.codesquad.item.dto.request.ItemUpdateRequest;
import kr.codesquad.item.dto.response.ItemCountDataResponse;
import kr.codesquad.location.service.AddressService;
import kr.codesquad.util.ItemStatus;
import kr.codesquad.util.TimeStamped;
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
	@Column(nullable = false)
	private Long locationId;
	@Column(nullable = false, length = 45)
	private String locationName;
	@Column(nullable = false, length = 1000)
	private String thumbnailUrl;
	@Column(nullable = false, length = 45)
	private ItemStatus status;
	@Column(nullable = false)
	private Long userId;
	@Column(nullable = true)
	private int viewCount;

	@Builder
	public Item(Long id, String title, String content, Long categoryId, Integer price, Long locationId, String locationName,
		String thumbnailUrl,
		ItemStatus status, Long userId, int viewCount) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.categoryId = categoryId;
		this.price = price;
		this.locationId = locationId;
		this.locationName = locationName;
		this.thumbnailUrl = thumbnailUrl;
		this.status = status;
		this.userId = userId;
		this.viewCount = viewCount;
	}

	public void update(ItemUpdateRequest request, String locationName, String thumbnailUrl) {
		this.title = request.getTitle();
		this.categoryId = request.getCategoryId();
		this.price = request.getPrice();
		this.content = request.getContent();
		this.locationId = request.getMyLocationId();
		if (locationName != null) {
			this.locationName = locationName;
		}
		if (thumbnailUrl != null) {
			this.thumbnailUrl = thumbnailUrl;
		}
	}

	public ItemCountDataResponse countData(int chatCount, int favoriteCount) {
		return ItemCountDataResponse.builder()
			.chat(chatCount)
			.favorite(favoriteCount)
			.view(this.viewCount)
			.build();
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public String updateStatus(String statusName) {
		this.status = ItemStatus.valueOf(statusName);
		return this.status.name();
	}

	public void updateViewCount() {
		this.viewCount++;
	}
}
