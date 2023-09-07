package kr.codesquad.util;

import java.util.HashMap;
import java.util.Map;

public class CategoryConverter {

    public static final Map<String, String> CATEGORY_MAP = new HashMap<>();

    static {
        CATEGORY_MAP.put("Digital Devices", "디지털기기");
        CATEGORY_MAP.put("Home Appliances", "생활가전");
        CATEGORY_MAP.put("Furniture or Interior", "가구/인테리어");
        CATEGORY_MAP.put("Living or Kitchen", "생활/주방");
        CATEGORY_MAP.put("Baby or Kids", "유아동");
        CATEGORY_MAP.put("Kids' Books", "유아도서");
        CATEGORY_MAP.put("Women's Clothing", "여성의류");
        CATEGORY_MAP.put("Women's Accessories", "여성잡화");
        CATEGORY_MAP.put("Men's Fashion or Men's Accessories", "남성패션/잡화");
        CATEGORY_MAP.put("Beauty or Grooming", "뷰티/미용");
        CATEGORY_MAP.put("Sports or Leisure", "스포츠/레저");
        CATEGORY_MAP.put("Hobbies or Gaming or Music", "취미/게임/음반");
        CATEGORY_MAP.put("Secondhand Cars", "중고차");
        CATEGORY_MAP.put("Tickets or Vouchers", "티켓/교환권");
        CATEGORY_MAP.put("Processed Foods", "가공식품");
        CATEGORY_MAP.put("Pet Foods", "반려동물식품");
        CATEGORY_MAP.put("Plants", "식물");
        CATEGORY_MAP.put("Other Secondhand Items", "기타중고물품");
    }

    public static String convert(String category) {
        return CATEGORY_MAP.get(category);
    }
}
