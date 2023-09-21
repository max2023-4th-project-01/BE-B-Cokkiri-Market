package kr.codesquad.favorite.repository;

import static kr.codesquad.category.entity.QCategory.*;
import static kr.codesquad.favorite.entity.QFavorite.*;
import static kr.codesquad.item.entity.QItem.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kr.codesquad.category.entity.Category;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FavoriteDslRespository {
	private final JPAQueryFactory queryFactory;

	public List<Category> readFavoriteCategories(Long userId) {
		return queryFactory
			.selectDistinct(Projections.fields(Category.class,
				category.id,
				category.name))
			.from(category)
			.innerJoin(item).on(category.id.eq(item.categoryId))
			.innerJoin(favorite).on(item.id.eq(favorite.itemId))
			.where(favorite.userId.eq(userId)).fetch();
	}
}
