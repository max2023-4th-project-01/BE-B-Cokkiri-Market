package kr.codesquad.item.dto;

import java.time.ZonedDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemListResponse {
	private Long id;
	private String title;
	private String locationName;
	private ZonedDateTime createdAt;
	private String statusName;
	private Integer price;
	private String thumbnailUrl;
	private ItemResponse.DetailOutDto.CountData countData;
	private Boolean isSeller;
}
