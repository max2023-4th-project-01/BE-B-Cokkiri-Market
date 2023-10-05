package kr.codesquad.location.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.codesquad.location.dto.request.LocationCreateRequest;
import kr.codesquad.location.dto.response.LocationListResponse;
import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LocationService {

    private final AddressService addressService;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;


    public LocationService(AddressService addressService, LocationRepository locationRepository, UserRepository userRepository) {
        this.addressService = addressService;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> getLocations(String query, Integer page, Integer size) {

        if (page == null) {
            page = 1;
        }

        if (size == null) {
            size = 15;
        }

        String result;
        if (query == null || query.isEmpty()) {
            result = addressService.getAddressListDefault(page, size);
        } else {
            result = addressService.getAddressList(query, page, size);
        }

        Map<String, Object> response = new HashMap<>();

        List<LocationListResponse> locations = new ArrayList<>();
        int start = 0;
        int end = 0;

        start = result.indexOf("total");
        end = result.indexOf(",", start);
        int total = Integer.parseInt(result.substring(start + 10, end - 1));

        if (page < total) {
            response.put("nextPage", page + 1);
        } else {
            response.put("nextPage", null);
        }

        if (page > total) {
            response.put("locations", new ArrayList<>());
            return response;
        }

        if (result.indexOf("full_nm", end) < result.indexOf("emd_cd", end)) {
            while (true) {
                start = result.indexOf("full_nm", end);
                if (start == -1) {
                    break;
                }
                end = result.indexOf(",", start);
                String name = result.substring(start + 10, end - 1);
                start = result.indexOf("emd_cd", end);
                end = result.indexOf(",", start);
                Long id = Long.parseLong(result.substring(start + 9, end - 1));
                locations.add(new LocationListResponse(id, name, null));
            }
        } else {
            while (true) {
                start = result.indexOf("emd_cd", end);
                if (start == -1) {
                    break;
                }
                end = result.indexOf(",", start);
                Long id = Long.parseLong(result.substring(start + 9, end - 1));
                start = result.indexOf("full_nm", end);
                end = result.indexOf(",", start);
                String name = result.substring(start + 10, end - 1);
                locations.add(new LocationListResponse(id, name, null));
            }
        }

        response.put("locations", locations);
        return response;
    }

    @Transactional(readOnly = true)
    public List<LocationListResponse> getMyLocations(String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        return LocationListResponse.toLocationList(locationRepository.findAllByUserId(userId));
    }

    @Transactional
    public LocationListResponse saveLocation(LocationCreateRequest request, String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        if (locationRepository.countByUserId(userId) >= 2) {
            throw new RuntimeException("동네는 최대 2개까지만 등록할 수 있습니다");
        }

        return LocationListResponse.of(locationRepository.save(Location.builder()
                .userId(userId)
                .locationId(request.getLocationId())
                .locationName(addressService.getAddress(request.getLocationId()))
                .isSelected(false)
                .build()));
    }

    @Transactional
    public void selectLocation(Long locationId, String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        List<Location> locations = locationRepository.findAllByUserIdOrderByIsSelectedDesc(userId);

        if (locations.size() == 0) {
            throw new RuntimeException("동네는 최소 1개 이상 등록되어야 합니다");
        }

        for (Location location : locations) {
            if (location.getId().equals(locationId)) {
                location.updateIsSelected(true);
            } else {
                location.updateIsSelected(false);
            }
        }
    }

    @Transactional
    public void deleteLocation(Long locationId, String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        if (locationRepository.countByUserId(userId) <= 1) {
            throw new RuntimeException("동네는 최소 1개 이상 등록되어야 합니다");
        }

        locationRepository.deleteById(locationId);
    }
}
