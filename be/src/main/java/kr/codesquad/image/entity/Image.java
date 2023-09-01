package kr.codesquad.image.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Long itemId;
	@Column(nullable = false, length = 200)
	private String url;

	@Builder
	public Image(Long id, Long itemId, String url) {
		this.id = id;
		this.itemId = itemId;
		this.url = url;
	}
}
