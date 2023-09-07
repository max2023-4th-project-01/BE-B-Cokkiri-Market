package kr.codesquad.item.dto.request;

import com.sun.istack.NotNull;

import lombok.Getter;

@Getter
public class ItemSaveRequest {
	@NotNull
	private String title;
	@NotNull
	private Long categoryId;
	private Integer price;
	@NotNull
	private String content;
	@NotNull
	private Long myLocationId;
}
