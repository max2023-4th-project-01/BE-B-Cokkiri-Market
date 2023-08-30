package kr.codesquad.util;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class TimeStamped {
	public static final ZoneId SEOUL_ZONE_ID = ZoneId.of("Asia/Seoul");
	@CreatedDate
	private ZonedDateTime createdAt;
	@LastModifiedDate
	private ZonedDateTime updatedAt;

	public void setUpdatedAt(ZonedDateTime updatedAt){ this.updatedAt = updatedAt;}
}
