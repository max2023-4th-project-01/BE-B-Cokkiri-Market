package kr.codesquad.location.service;

import java.util.ArrayList;
import java.util.List;

import kr.codesquad.location.dto.response.LocationListResponse;
import kr.codesquad.util.SecretProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {

    private final String V_WORLD_ENDPOINT;
    private final String V_WORLD_KEY;
    private final String V_WORLD_DOMAIN;

    public LocationService(SecretProperties secretProperties) {
        V_WORLD_ENDPOINT = secretProperties.getVworld().getEndpoint();
        V_WORLD_KEY = secretProperties.getVworld().getKey();
        V_WORLD_DOMAIN = secretProperties.getVworld().getDomain();
    }

    public List<LocationListResponse> getLocations(String query) {

        final String endpoint = V_WORLD_ENDPOINT;
        String key = "&key=" + V_WORLD_KEY;
        String domain = "&domain=" + V_WORLD_DOMAIN;
        String search = "&attrFilter=emd_kor_nm:like:" + query;

        String url = endpoint + key + domain + search;

        RestTemplate restTemplate = new RestTemplate();

        String result = restTemplate.getForObject(url, String.class);

        List<LocationListResponse> locations = new ArrayList<>();

        int start = 0;
        int end = 0;

        while (true) {
            start = result.indexOf("full_nm", end);
            if (start == -1) {
                break;
            }
            end = result.indexOf(",", start);
            String name = result.substring(start + 10, end - 1);
            Long id = Long.parseLong(result.substring(end + 11, end + 19));
            locations.add(new LocationListResponse(id, name, null));
        }

        return locations;
    }
}
