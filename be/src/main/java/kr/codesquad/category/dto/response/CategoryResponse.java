package kr.codesquad.category.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String iconName;

    public CategoryResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
