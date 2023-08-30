package kr.codesquad.image;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.item.dto.ItemResponse;

public interface ImageRepository extends JpaRepository<Image, Long> {
	List<ItemResponse.imageInfo> findByItemId(Long itemId);
}
