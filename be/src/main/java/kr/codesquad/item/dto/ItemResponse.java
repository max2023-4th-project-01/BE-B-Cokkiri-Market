package kr.codesquad.item.dto;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import kr.codesquad.category.Category;
import kr.codesquad.util.ItemStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

public class ItemResponse {

	@Getter
	@Builder
	public static class DetailOutDto {

		private Boolean isSeller;
		private List<imageInfo> images;
		private String seller;
		private List<StatusDropdown> status;
		private String title;
		private String categoryName;
		private ZonedDateTime createdAt;
		private String content;
		private CountData countData;
		private Boolean isFavorite;
		private Integer price;

		@Getter
		@AllArgsConstructor
		public static class StatusDropdown {
			private String name;
			private Boolean isSelected;

			public static List<StatusDropdown> of(ItemStatus itemStatus) {
				List<StatusDropdown> statusDropdown = new ArrayList<>();
				for (ItemStatus status : ItemStatus.values()) {
					statusDropdown.add(new StatusDropdown(status.toString(), status.equals(itemStatus)));
				}
				return statusDropdown;
			}
		}

		@Getter
		@Builder
		public static class CountData {
			@Builder.Default
			private int chat = 0;
			@Builder.Default
			private int favorite = 0;
			@Builder.Default
			private int view = 0;
		}
	}

	@Getter
	@Builder
	public static class UpdateOutDto {
		private List<imageInfo> images;
		private String title;
		// 추천했던 카테고리 기억 용인데, 안 쓸 듯
		// private List<Category> categories;
		private Long categoryId;
		private String content;
		private Integer price;
		private String locationName;
	}

	@Getter
	public static class imageInfo {
		private Long id;
		private String url;
	}
}
