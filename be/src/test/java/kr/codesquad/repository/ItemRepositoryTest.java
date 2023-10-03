package kr.codesquad.repository;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.repository.ItemRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.util.ItemStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class ItemRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ItemRepository itemRepository;

    @BeforeEach
    void setUp() {
        User user = User.builder()
                .id(1L)
                .loginId("aaaa1234")
                .password("aaaa1234")
                .nickname("nick1234")
                .build();
        Item item = Item.builder()
                .id(1L)
                .title("title")
                .content("content")
                .price(1000)
                .viewCount(0)
                .status(ItemStatus.판매중)
                .userId(user.getId())
                .thumbnailUrl("thumbnailUrl")
                .categoryId(1L)
                .locationId(11110101L)
                .locationName("서울특별시 종로구 청운동")
                .build();
        itemRepository.save(item);
    }

    @Test
    void existsByIdAndUserLoginId() {
    }

    @Test
    @Transactional
    void updateView() {
        // given
        Item item1 = itemRepository.findById(1L).get();
        Item item2 = itemRepository.save(Item.builder()
                .id(2L)
                .title("title")
                .content("content")
                .price(1000)
                .viewCount(30)
                .status(ItemStatus.판매중)
                .userId(1L)
                .thumbnailUrl("thumbnailUrl")
                .categoryId(1L)
                .locationId(11110101L)
                .locationName("서울특별시 종로구 청운동")
                .build());

        // when
        itemRepository.updateView(1L);
        itemRepository.updateView(2L);

        // then
        assertThat(item1).extracting("viewCount").isEqualTo(0);
        assertThat(item2).extracting("viewCount").isEqualTo(30);
        assertThat(itemRepository.findById(1L).get()).extracting("viewCount").isEqualTo(1);
        assertThat(itemRepository.findById(2L).get()).extracting("viewCount").isEqualTo(31);
    }

}
