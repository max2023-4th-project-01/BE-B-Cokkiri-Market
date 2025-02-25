package kr.codesquad.favorite.entity;

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
public class Favorite {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Long itemId;
	@Column(nullable = false)
	private Long userId;

	@Builder
	public Favorite(Long id, Long itemId, Long userId) {
		this.id = id;
		this.itemId = itemId;
		this.userId = userId;
	}
}
