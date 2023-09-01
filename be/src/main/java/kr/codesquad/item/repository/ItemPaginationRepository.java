package kr.codesquad.item.repository;

import static kr.codesquad.chat.entity.QChat.*;
import static kr.codesquad.favorite.entity.QFavorite.*;
import static kr.codesquad.item.entity.QItem.*;
import static kr.codesquad.user.entity.QUser.*;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.codesquad.item.dto.ItemListVo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ItemPaginationRepository {

	private final JPAQueryFactory queryFactory;

	public Slice<ItemListVo> findByIdAndLocationName(Long itemId, String locationName,
		Long categoryId, int pageSize) {
		List<ItemListVo> itemListVos = queryFactory
			.select(Projections.fields(ItemListVo.class,
				item.id,
				item.thumbnailUrl,
				item.title,
				item.locationName,
				item.createdAt,
				item.price,
				item.status,
				chat.countDistinct().as("chat"),
				favorite.countDistinct().as("favorite"),
				user.loginId
			))
			.from(item)
			.leftJoin(chat).on(item.id.eq(chat.itemId))
			.leftJoin(favorite).on(item.id.eq(favorite.itemId))
			.leftJoin(user).on(item.userId.eq(user.id))
			.where(lessThanItemId(itemId),
				equalLocationName(locationName)
				, equalCategoryId(categoryId)
			)
			.groupBy(item.id, item.thumbnailUrl, item.title, item.locationName, item.createdAt, item.price, item.status,
				user.loginId)
			.orderBy(item.createdAt.desc())
			.limit(pageSize + 1)    // 다음 요소가 있는지 확인하기 위해 +1개 만큼 더 가져온다.

			.fetch();
		return checkLastPage(pageSize, itemListVos);
	}

	private BooleanExpression lessThanItemId(Long itemId) {
		if (itemId == null) {
			return null;
		}

		return item.id.lt(itemId);
	}

	private BooleanExpression equalLocationName(String locationName) {
		if (locationName == null) {
			return null;
		}

		return item.locationName.eq(locationName);
	}

	private BooleanExpression equalCategoryId(Long categoryId) {
		if (categoryId == null) {
			return null;
		}

		return item.categoryId.eq(categoryId);
	}

	private Slice<ItemListVo> checkLastPage(int pageSize, List<ItemListVo> results) {

		boolean hasNext = false;

		if (results.size() > pageSize) {
			hasNext = true;
			results.remove(pageSize);
		}

		return new SliceImpl<>(results, PageRequest.ofSize(pageSize), hasNext);
	}
}
