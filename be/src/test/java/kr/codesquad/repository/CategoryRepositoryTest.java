package kr.codesquad.repository;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.category.dto.response.CategoryResponse;
import kr.codesquad.category.entity.Category;
import kr.codesquad.category.repository.CategoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;


@SpringBootTest
class CategoryRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Test
    @DisplayName("카테고리 초기값 들어가는지 확인")
    public void initCategory() {
        // when
        long categoryCount = categoryRepository.count();

        // then
        assertThat(categoryCount).isEqualTo(18);
    }

    @Test
    @DisplayName("카테고리 체크 테스트 - 잘못된 카테고리 추가")
    public void missedCategoryTest() {
        // given
        Category category = createCategory(19L, "카테고리아님", "missed");
        categoryRepository.save(category);

        // when
        // data.sql 재실행
        excuteDataSqlScript();

        // then
        assertThat(categoryRepository.findById(19L).orElse(null)).isNull();

    }

    @Test
    @DisplayName("카테고리 체크 테스트 - 잘못된 카테고리 내용")
    public void missedCategoryContentTest() {
        // given
        Category category = createCategory(1L, "카테고리아님", "missed");
        categoryRepository.save(category);

        // when
        // data.sql 재실행
        excuteDataSqlScript();

        // then
        assertThat(categoryRepository.findById(1L).get().getName()).isEqualTo("디지털기기");
    }

    @Test
    @DisplayName("카테고리 목록 조회 테스트")
    void findAlltoDto() {
        // given

        // when
        List<CategoryResponse> response = categoryRepository.findAlltoDto();

        // then
        assertThat(response)
                .hasSize(18)
                .extracting("id", "name", "iconName")
                .contains(
                        tuple(1L, "디지털기기", "icon_digital"),
                        tuple(2L, "생활가전", "icon_appliance"),
                        tuple(18L, "기타중고물품", "icon_etc")
                );
    }

    @Test
    @DisplayName("카테고리 아이디로 이름 조회 테스트")
    void findNameById() {
        // given

        // when
        String name = categoryRepository.findNameById(1L);

        // then
        assertEquals(name, "디지털기기");
    }

    @Test
    @DisplayName("카테고리 이름으로 조회 테스트 (3개 입력 순서대로 가져오기)")
    void findByName() {
        // given

        // when
        List<CategoryResponse> response = categoryRepository.findByName("여성의류", "디지털기기", "생활/주방");

        // then
        assertThat(response)
                .hasSize(3)
                .extracting("id", "name")
                .contains(
                        tuple(7L, "여성의류"),
                        tuple(1L, "디지털기기"),
                        tuple(4L, "생활/주방")
                );

    }

    Category createCategory(Long id, String name, String icon) {
        return new Category(id, name, icon);
    }


    void excuteDataSqlScript() {
        jdbcTemplate.execute("DELETE FROM category");
        jdbcTemplate.execute("ALTER TABLE category ALTER COLUMN id RESTART WITH 1");
        jdbcTemplate.execute("INSERT INTO category (name, icon_name) VALUES " +
                "('디지털기기', 'icon_digital'), " +
                "('생활가전', 'icon_appliance'), " +
                "('가구/인테리어', 'icon_furniture')," +
                "('생활/주방', 'icon_kitchen'), " +
                "('유아동', 'icon_baby'), " +
                "('유아도서', 'icon_babybook'), " +
                "('여성의류', 'icon_clothes'), " +
                "('여성잡화', 'icon_accessories'), " +
                "('남성패션/잡화', 'icon_man'), " +
                "('뷰티/미용', 'icon_beauty'), " +
                "('스포츠/레저', 'icon_sports'), " +
                "('취미/게임/음반', 'icon_hobby'), " +
                "('중고차', 'icon_car'), " +
                "('티켓/교환권', 'icon_ticket'), " +
                "('가공식품', 'icon_food'), " +
                "('반려동물식품', 'icon_pet'), " +
                "('식물', 'icon_plant'), " +
                "('기타중고물품', 'icon_etc')");
    }
}