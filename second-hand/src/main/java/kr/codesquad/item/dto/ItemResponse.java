package kr.codesquad.item.dto;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

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

		private boolean isSeller;
		private List<imageInfo> images;
		private String seller;
		private List<StatusDropdown> status;
		private String title;
		private String categoryName;
		private ZonedDateTime createdAt;
		private String content;
		private CountData countData;
		private boolean isFavorite;
		private Integer price;

		@Getter
		public static class imageInfo {
			private Long id;
			private String url;
		}

		@Getter
		@AllArgsConstructor
		public static class StatusDropdown {
			private String name;
			private boolean isSelected;

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
}
