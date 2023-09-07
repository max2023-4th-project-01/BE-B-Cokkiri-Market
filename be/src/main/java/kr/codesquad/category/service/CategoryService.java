package kr.codesquad.category.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.codesquad.category.dto.response.CategoryResponse;
import kr.codesquad.util.CategoryConverter;
import kr.codesquad.util.SecretProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import kr.codesquad.category.repository.CategoryRepository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class CategoryService {

	private final CategoryRepository categoryRepository;
	private final String OEPN_AI_ENDPOINT;
	private final String OPEN_AI_KEY;
	private final String OPEN_AI_PROMPT;
	Logger logger = LoggerFactory.getLogger(CategoryService.class);

	public CategoryService(CategoryRepository categoryRepository, SecretProperties secretProperties) {
		this.categoryRepository = categoryRepository;
		this.OEPN_AI_ENDPOINT = secretProperties.getOpenai().getEndpoint();
		this.OPEN_AI_KEY = secretProperties.getOpenai().getKey();
		this.OPEN_AI_PROMPT = secretProperties.getOpenai().getPrompt();
	}

	public List<CategoryResponse> getCategories() {
		return categoryRepository.findAlltoDto();
	}

    public List<CategoryResponse> recommendCategory(String title) {
		String endpoint = OEPN_AI_ENDPOINT;
		String key = OPEN_AI_KEY;
		String prompt = String.format(OPEN_AI_PROMPT, title);

		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getInterceptors().add((request, body, execution) -> {
			request.getHeaders().add("Authorization", "Bearer " + key);
			return execution.execute(request, body);
		});

		Map<String, Object> request = new HashMap<>();
		request.put("model", "gpt-3.5-turbo");
		request.put("temperature", 0.1);
		List<Message> messages = new ArrayList<>();
		messages.add(new Message("user", prompt));
		request.put("messages", messages);

		String response = null;
		try {
			// 응답이 너무 느려서 비동기 처리 예정
			response = restTemplate.postForObject(endpoint, request, String.class);
		} catch (HttpClientErrorException.TooManyRequests e) {
			logger.error("API 사용량을 초과했습니다.");
			throw new RuntimeException("API 사용량을 초과했습니다.");
		}

		ObjectMapper objectMapper = new ObjectMapper();
		String content = null;
		try {
			JsonNode jsonNode = objectMapper.readTree(response);
			content = jsonNode.get("choices").get(0).get("message").get("content").asText();
			logger.info("content: {}", content);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}

		List<String> categories = new ArrayList<>();
		for (int i = 0; i < 3; i++) {
			String category = content.substring(content.indexOf("[") + 1, content.indexOf("]"));
			categories.add(CategoryConverter.convert(category));
			content = content.substring(content.indexOf("]") + 1);
		}
		logger.info("categories: {}", categories);

		return categoryRepository.findByName(categories.get(0), categories.get(1), categories.get(2));
	}

	@Getter
	@AllArgsConstructor
	private static class Message {
		private String role;
		private String content;
	}
}
