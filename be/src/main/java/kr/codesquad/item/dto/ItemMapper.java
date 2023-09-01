package kr.codesquad.item.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ItemMapper {
	ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

	@Mapping(target = "countData", source = "countData")
	@Mapping(target = "statusName", source = "statusName")
	@Mapping(target = "isSeller", source = "isSeller")
	ItemListResponse toItemListResponse(ItemListVo itemListVo, ItemResponse.DetailOutDto.CountData countData
		, String statusName, Boolean isSeller);

}
