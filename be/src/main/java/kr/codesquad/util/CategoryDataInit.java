package kr.codesquad.util;

import kr.codesquad.category.entity.Category;
import kr.codesquad.category.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class CategoryDataInit {

    public static final Map<Long, List<String>> categories = Map.ofEntries(
            Map.entry(1L, Arrays.asList("디지털기기", "icon_digital")),
            Map.entry(2L, Arrays.asList("생활가전", "icon_appliance")),
            Map.entry(3L, Arrays.asList("가구/인테리어", "icon_furniture")),
            Map.entry(4L, Arrays.asList("생활/주방", "icon_kitchen")),
            Map.entry(5L, Arrays.asList("유아동", "icon_baby")),
            Map.entry(6L, Arrays.asList("유아도서", "icon_babybook")),
            Map.entry(7L, Arrays.asList("여성의류", "icon_clothes")),
            Map.entry(8L, Arrays.asList("여성잡화", "icon_accessories")),
            Map.entry(9L, Arrays.asList("남성패션/잡화", "icon_man")),
            Map.entry(10L, Arrays.asList("뷰티/미용", "icon_beauty")),
            Map.entry(11L, Arrays.asList("스포츠/레저", "icon_sports")),
            Map.entry(12L, Arrays.asList("취미/게임/음반", "icon_hobby")),
            Map.entry(13L, Arrays.asList("중고차", "icon_car")),
            Map.entry(14L, Arrays.asList("티켓/교환권", "icon_ticket")),
            Map.entry(15L, Arrays.asList("가공식품", "icon_food")),
            Map.entry(16L, Arrays.asList("반려동물식품", "icon_pet")),
            Map.entry(17L, Arrays.asList("식물", "icon_plant")),
            Map.entry(18L, Arrays.asList("기타중고물품", "icon_etc"))
    );

    @Bean
    public static CommandLineRunner initDatabase(CategoryRepository categoryRepository) {
            return args -> {
                if (checkCategory(categoryRepository)) {
                    categoryRepository.deleteAll();
                    List<Category> categoryList = new ArrayList<>();
                    for (long id = 1; id <= categories.size(); id++) {
                        categoryList.add(new Category(id, categories.get(id).get(0), categories.get(id).get(1)));
                    }
                    categoryRepository.saveAll(categoryList);
                }
        };
    }

    private static boolean checkCategory(CategoryRepository categoryRepository) {
        List<Category> categoryList = categoryRepository.findAll();
        if (categoryList.size() != 18) {
            return true;
        }
        for (int i = 0; i < 18; i++) {
            Category category = categoryList.get(i);
            if (!category.getName().equals(categories.get(category.getId()).get(0))
                    || !category.getIconName().equals(categories.get(category.getId()).get(1))) {
                return true;
            }
        }
        return false;
    }

}
