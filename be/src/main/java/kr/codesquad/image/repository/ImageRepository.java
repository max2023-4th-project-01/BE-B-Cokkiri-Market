package kr.codesquad.image.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.codesquad.image.entity.Image;
import kr.codesquad.item.dto.response.ItemImageResponse;

public interface ImageRepository extends JpaRepository<Image, Long> {
	List<ItemImageResponse> findByItemId(Long itemId);
}
