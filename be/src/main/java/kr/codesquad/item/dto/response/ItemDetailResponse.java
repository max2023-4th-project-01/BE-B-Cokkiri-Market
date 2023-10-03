package kr.codesquad.item.dto.response;

import java.time.ZonedDateTime;
import java.util.List;

import javax.servlet.http.Cookie;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.minidev.json.annotate.JsonIgnore;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ItemDetailResponse {
	private Boolean isSeller;
	private List<ItemImageResponse> images;
	private String seller;
	private List<ItemStatusResponse> status;
	private String title;
	private String categoryName;
	private ZonedDateTime createdAt;
	private String content;
	private ItemCountDataResponse countData;
	private Boolean isFavorite;
	private Integer price;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Cookie cookie;
}
