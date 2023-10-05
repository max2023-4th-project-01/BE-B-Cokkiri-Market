package kr.codesquad.item.repository;

import static kr.codesquad.chat.entity.QChatRoom.*;
import static kr.codesquad.favorite.entity.QFavorite.*;
import static kr.codesquad.item.entity.QItem.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.codesquad.item.dto.vo.ItemListVo;
import kr.codesquad.item.entity.ItemConditions;
import kr.codesquad.util.ItemStatus;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ItemPaginationRepository {

	private final JPAQueryFactory queryFactory;

	public List<ItemListVo> readByConditions(ItemConditions itemConditions) {
		return queryFactory
			.select(Projections.fields(ItemListVo.class,
				item.id,
				item.thumbnailUrl,
				item.title,
				item.locationName,
				item.createdAt,
				item.price,
				item.status,
				chatRoom.countDistinct().as("chat"),
				favorite.countDistinct().as("favorite"),
				item.viewCount.as("view"),
				item.userId
			))
			.from(item)
			.leftJoin(chatRoom).on(item.id.eq(chatRoom.itemId))
			.leftJoin(favorite).on(item.id.eq(favorite.itemId))
			.where(lessThanItemId(itemConditions.getItemId()), equalLocationName(itemConditions.getLocationName())
				, equalCategoryId(itemConditions.getCategoryId()), checkStatus(itemConditions.getIsSold())
				, checkFavoriteOrUserItem(itemConditions.getIsFavorite(), itemConditions.getUserId())
			)
			.groupBy(item.id, item.thumbnailUrl, item.title, item.locationName, item.createdAt, item.price, item.status, item.viewCount,
				item.userId)
			.orderBy(item.id.desc())
			.limit(itemConditions.getPageSize() + 1)    // 다음 요소가 있는지 확인하기 위해 +1개 만큼 더 가져온다.

			.fetch();
	}

	private BooleanExpression checkFavoriteOrUserItem(Boolean isFavorite, Long userId) {
		if (isFavorite == null) {
			return equalUserId(userId);
		}

		return item.id.in(
			queryFactory
				.select(favorite.itemId)
				.from(favorite)
				.where(favorite.userId.eq(userId))
		);
	}

	private BooleanExpression equalUserId(Long userId) {
		if (userId == null) {
			return null;
		}
		return item.userId.eq(userId);
	}

	private BooleanExpression checkStatus(Boolean isSold) {
		if (isSold == null) {
			return null;
		}
		if (isSold) {
			return item.status.eq(ItemStatus.판매완료);
		}
		return item.status.in(ItemStatus.예약중, ItemStatus.판매중);
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
}
