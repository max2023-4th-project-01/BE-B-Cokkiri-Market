package kr.codesquad.item.dto;


import com.sun.istack.NotNull;
import lombok.Getter;

import java.util.List;

public class ItemRequest {

    @Getter
    public static class SaveInDto {
        @NotNull
        private String title;
        @NotNull
        //private List<CategoryRequest> categories;
        private Long categoryId;
        private Integer price;
        @NotNull
        private String content;
        @NotNull
        private String locationName;

        // 일단 보류
        @Getter
        private static class CategoryRequest {
            @NotNull
            private Long id;
            @NotNull
            private String name;
            @NotNull
            private boolean isSelected;
        }
    }

    @Getter
    public static class UpdateInDto {
        @NotNull
        private String title;
        @NotNull
        private Long categoryId;
        private Integer price;
        @NotNull
        private String content;
        @NotNull
        private String locationName;
    }
}
