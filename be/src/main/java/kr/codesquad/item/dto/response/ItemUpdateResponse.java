package kr.codesquad.item.dto.response;

import java.util.List;

import kr.codesquad.category.dto.response.CategoryEditResponse;
import kr.codesquad.location.dto.response.LocationListResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemUpdateResponse {
	private List<ItemImageResponse> images;
	private String title;
	// 추천했던 카테고리 기억 용인데, 안 쓸 듯
	private List<CategoryEditResponse> categories;
	//private Long categoryId;
	private String content;
	private Integer price;
	private List<LocationListResponse> locations;
}
