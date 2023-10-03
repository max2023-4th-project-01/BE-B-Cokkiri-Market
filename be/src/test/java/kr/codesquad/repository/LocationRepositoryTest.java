package kr.codesquad.repository;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class LocationRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private LocationRepository locationRepository;

    @BeforeEach
    void setUp() {
        Location location1 = createLocation(1L, 11680101L, "서울특별시 강남구 역삼동", false);
        Location location2 = createLocation(1L, 11110101L, "서울특별시 종로구 청운동", true);
        locationRepository.save(location1);
        locationRepository.save(location2);
    }

    @AfterEach
    void tearDown() {
        locationRepository.deleteAllInBatch();
    }

    @Test
    @DisplayName("유저의 아이디로 유저의 선택된 동네를 찾는다.")
    void findSelectedLocationByUserId() {
        // given

        // when
        Location location = locationRepository.findSelectedLocationByUserId(1L);

        // then
        assertThat(location).extracting("id", "userId", "locationId", "locationName", "isSelected")
                .containsExactly(2L, 1L, 11110101L, "서울특별시 종로구 청운동", true);
    }

    @Test
    @DisplayName("유저의 아이디로 유저의 동네를 모두 찾는다.")
    void findAllByUserId() {
        // given

        // when
        List<Location> locations = locationRepository.findAllByUserId(1L);

        // then
        assertThat(locations)
                .hasSize(2)
                .extracting("id", "userId", "locationId", "locationName", "isSelected")
                .containsExactlyInAnyOrder(
                        tuple(1L, 1L, 11680101L, "서울특별시 강남구 역삼동", false),
                        tuple(2L, 1L, 11110101L, "서울특별시 종로구 청운동", true)
                );
    }

    @Test
    @DisplayName("유저의 아이디로 유저의 동네를 모두 찾는다. (선택된 동네가 먼저 나온다.)")
    void findAllByUserIdOrderByIsSelectedDesc() {
        // given

        // when
        List<Location> locations = locationRepository.findAllByUserIdOrderByIsSelectedDesc(1L);

        // then
        assertThat(locations)
                .hasSize(2)
                .extracting("id", "userId", "locationId", "locationName", "isSelected")
                .containsExactly(
                        tuple(2L, 1L, 11110101L, "서울특별시 종로구 청운동", true),
                        tuple(1L, 1L, 11680101L, "서울특별시 강남구 역삼동", false)
                );
    }

    @Test
    @DisplayName("유저의 아이디로 유저의 동네 개수를 찾는다.")
    void countByUserId() {
        // given

        // when
        Integer count = locationRepository.countByUserId(1L);

        // then
        assertThat(count).isEqualTo(2);
    }

    @Test
    @DisplayName("내 동네 아이디로 그 동네의 이름을 찾는다.")
    void findLocationNameById() {
        // given

        // when
        String locationName1 = locationRepository.findLocationNameById(1L);
        String locationName2 = locationRepository.findLocationNameById(2L);

        // then
        assertThat(locationName1).isEqualTo("서울특별시 강남구 역삼동");
        assertThat(locationName2).isEqualTo("서울특별시 종로구 청운동");
    }

    Location createLocation(Long userId, Long locationId, String locationName, Boolean isSelected) {
        return Location.builder()
                .userId(userId)
                .locationId(locationId)
                .locationName(locationName)
                .isSelected(isSelected)
                .build();
    }
}
