package kr.codesquad.category.dto.response;


import lombok.Builder;
import lombok.Getter;

@Getter
public class CategoryEditResponse {

    private Long id;
    private String name;
    private Boolean isSelected;

    @Builder
    public CategoryEditResponse(Long id, String name, Boolean isSelected) {
        this.id = id;
        this.name = name;
        this.isSelected = isSelected;
    }
}
