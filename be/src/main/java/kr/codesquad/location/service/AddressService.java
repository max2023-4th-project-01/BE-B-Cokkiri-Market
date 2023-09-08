package kr.codesquad.location.service;

import kr.codesquad.util.SecretProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AddressService {

    private final String V_WORLD_ENDPOINT;
    private final String V_WORLD_KEY;
    private final String V_WORLD_DOMAIN;

    public AddressService(SecretProperties secretProperties) {
        this.V_WORLD_ENDPOINT = secretProperties.getVworld().getEndpoint();
        this.V_WORLD_KEY = secretProperties.getVworld().getKey();
        this.V_WORLD_DOMAIN = secretProperties.getVworld().getDomain();
    }

    public String getAddressList(String query, int page, int size) {
        final String endpoint = V_WORLD_ENDPOINT;
        String key = "&key=" + V_WORLD_KEY;
        String domain = "&domain=" + V_WORLD_DOMAIN;
        String search = "&attrFilter=emd_kor_nm:like:" + query;

        String url = endpoint + key + domain + search + "&page=" + page + "&size=" + size;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    public String getAddress(Long locationId) {
        final String endpoint = V_WORLD_ENDPOINT;
        String key = "&key=" + V_WORLD_KEY;
        String domain = "&domain=" + V_WORLD_DOMAIN;
        String search = "&attrFilter=emd_cd:=:" + locationId.toString();

        String url = endpoint + key + domain + search;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);

        int start = result.indexOf("full_nm");
        int end = result.indexOf(",", start);
        return result.substring(start + 10, end - 1);
    }

    public String getAddressListDefault(Integer page, Integer size) {
        final String endpoint = V_WORLD_ENDPOINT;
        String key = "&key=" + V_WORLD_KEY;
        String domain = "&domain=" + V_WORLD_DOMAIN;
        String search = "&attrFilter=emd_cd:>:0";

        String url = endpoint + key + domain + search + "&page=" + page + "&size=" + size;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
