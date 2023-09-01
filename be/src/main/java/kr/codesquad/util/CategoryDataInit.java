package kr.codesquad.util;

import kr.codesquad.category.entity.Category;
import kr.codesquad.category.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class CategoryDataInit {

    @Bean
    CommandLineRunner initDatabase(CategoryRepository categoryRepository) {
            return args -> {
                long categoryCount = categoryRepository.count();
                if (categoryCount != 18) {
                    categoryRepository.deleteAll();
                    List<Category> categories = Arrays.asList(
                            new Category("디지털기기", "icon_digital"),
                            new Category("생활가전", "icon_appliance"),
                            new Category("가구/인테리어", "icon_furniture"),
                            new Category("생활/주방", "icon_kitchen"),
                            new Category("유아동", "icon_baby"),
                            new Category("유아도서", "icon_book"),
                            new Category("여성의류", "icon_clothes"),
                            new Category("여성잡화", "icon_accessories"),
                            new Category("남성패션/잡화", "icon_man"),
                            new Category("뷰티/미용", "icon_beauty"),
                            new Category("스포츠/레저", "icon_sports"),
                            new Category("취미/게임/음반", "icon_hobby"),
                            new Category("중고차", "icon_car"),
                            new Category("티켓/교환권", "icon_ticket"),
                            new Category("가공식품", "icon_food"),
                            new Category("반려동물식품", "icon_pet"),
                            new Category("식물", "icon_plant"),
                            new Category("기타 중고물품", "icon_etc")
                    );
                    categoryRepository.saveAll(categories);
                }
        };
    }
}
