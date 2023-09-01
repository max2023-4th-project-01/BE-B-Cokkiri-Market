package kr.codesquad.item.dto.request;

import com.sun.istack.NotNull;

import lombok.Getter;

@Getter
public class ItemSaveRequest {
	@NotNull
	private String title;
	@NotNull
	//private List<CategoryRequest> categories;
	private Long categoryId;
	private Integer price;
	@NotNull
	private String content;
	@NotNull
	private String locationName;
}
