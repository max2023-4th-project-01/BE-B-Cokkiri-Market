package kr.codesquad.location.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "user_location")
@NoArgsConstructor
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Long userId;
	@Column(nullable = false, length = 45)
	private String locationName;
	@Column(nullable = false)
	private Boolean isSelected;

	@Builder
	public Location(Long id, Long userId, String locationName, Boolean isSelected) {
		this.id = id;
		this.userId = userId;
		this.locationName = locationName;
		this.isSelected = isSelected;
	}

	public void updateIsSelected(boolean isSelected) {
		this.isSelected = isSelected;
	}
}
