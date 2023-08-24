package kr.codesquad.category;

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
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, length = 45)
	private String name;
	@Column(nullable = false, length = 45)
	private String iconName;

	@Builder
	public Category(Long id, String name, String iconName) {
		this.id = id;
		this.name = name;
		this.iconName = iconName;
	}
}
