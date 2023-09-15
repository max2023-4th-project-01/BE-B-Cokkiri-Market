package kr.codesquad.image.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.image.entity.Image;
import kr.codesquad.item.dto.response.ItemImageResponse;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends JpaRepository<Image, Long> {

	// dto 로 받기
	@Query("SELECT new kr.codesquad.item.dto.response.ItemImageResponse(i.id, i.url) FROM Image i WHERE i.itemId = :itemId")
	List<ItemImageResponse> findByItemId(Long itemId);

	void deleteAllByIdIn(List<Long> deleteImageIds);
}
