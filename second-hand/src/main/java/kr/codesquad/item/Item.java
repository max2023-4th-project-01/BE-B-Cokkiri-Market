package kr.codesquad.item;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
	@Column(nullable = false, length = 45)
	private String locationName;
	@Column(nullable = false, length = 200)
	private String thumbnailUrl;
	@Column(nullable = false, length = 45)
	private String status;
	@Column(nullable = false)
	private Long userId;

	@Builder
	public Item(Long id, String title, String content, Long categoryId, String locationName, String thumbnailUrl,
		String status, Long userId) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.categoryId = categoryId;
		this.locationName = locationName;
		this.thumbnailUrl = thumbnailUrl;
		this.status = status;
		this.userId = userId;
	}
}
