package kr.codesquad.util;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {
	private final RedisTemplate<String, Object> redisTemplate;

	public void setData(String key, Object o, int minutes) {
		//Redis에 저장할 데이터 방식을 설정(여기서는 자바 object를 json으로 저장함)
		redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(o.getClass()));
		//Redis의 String타입 구조에 작업을 수행하기 위한 연산
		redisTemplate.opsForValue().set(key, o, minutes, TimeUnit.MINUTES);
	}

	public boolean hasKey(String key) {
		return Boolean.TRUE.equals(redisTemplate.hasKey(key));
	}

	public Object get(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	public boolean delete(String key) {
		return Boolean.TRUE.equals(redisTemplate.delete(key));
	}
}
