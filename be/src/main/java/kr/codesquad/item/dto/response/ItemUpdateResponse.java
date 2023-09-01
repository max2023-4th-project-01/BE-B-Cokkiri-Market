package kr.codesquad.item.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemUpdateResponse {
	private List<ItemImageResponse> images;
	private String title;
	// 추천했던 카테고리 기억 용인데, 안 쓸 듯
	// private List<Category> categories;
	private Long categoryId;
	private String content;
	private Integer price;
	private String locationName;
}
