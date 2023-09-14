package kr.codesquad.service;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import kr.codesquad.IntegrationTestSupport;
import kr.codesquad.category.entity.Category;
import kr.codesquad.category.repository.CategoryRepository;
import kr.codesquad.chat.entity.Chat;
import kr.codesquad.chat.entity.Message;
import kr.codesquad.chat.repository.ChatRepository;
import kr.codesquad.chat.repository.MessageRepository;
import kr.codesquad.favorite.entity.Favorite;
import kr.codesquad.favorite.repository.FavoriteRepository;
import kr.codesquad.item.dto.slice.ItemListSlice;
import kr.codesquad.item.dto.slice.UserItemListSlice;
import kr.codesquad.item.entity.Item;
import kr.codesquad.item.repository.ItemPaginationRepository;
import kr.codesquad.item.repository.ItemRepository;
import kr.codesquad.item.service.ItemService;
import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.entity.User;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.ItemStatus;

public class ItemServiceTest extends IntegrationTestSupport {
	@Autowired
	ItemService itemService;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ItemRepository itemRepository;
	@Autowired
	ItemPaginationRepository itemPaginationRepository;
	@Autowired
	LocationRepository locationRepository;
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	ChatRepository chatRepository;
	@Autowired
	FavoriteRepository favoriteRepository;
	@Autowired
	MessageRepository messageRepository;

	@AfterEach
	void dbClean() {
		userRepository.deleteAllInBatch();
		locationRepository.deleteAllInBatch();
		chatRepository.deleteAllInBatch();
		favoriteRepository.deleteAllInBatch();
		messageRepository.deleteAllInBatch();
		itemRepository.deleteAllInBatch();
		categoryRepository.deleteAllInBatch();
	}

	@DisplayName("홈페이지 조회시 로그인한 유저의 동네에서 판매되는 아이템을 페이지 사이즈 만큼 반환한다")
	@Test
	void readAllTest() {
		// given
		User user = createAndSaveUser(1);
		Boolean isSelected = true;
		Location location = createAndSaveLocation(user.getId(), isSelected);
		Category category = createAndSaveCategory();

		Item nextCursorItem = createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매중,
			user.getId(),
			location.getLocationName());
		int pageSize = 10;
		for (int i = 0; i < pageSize; i++) {
			createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매중, user.getId(),
				location.getLocationName());
		}

		// when
		ItemListSlice itemListSlice = itemService.readAll(null, null, pageSize, user.getLoginId());

		// then
		assertThat(itemListSlice.getItems().size()).isEqualTo(pageSize);
		assertThat(itemListSlice.getNextCursor()).isEqualTo(nextCursorItem.getId());
	}

	@DisplayName("홈페이지 조회시 로그인한 유저의 동네에서 판매되는 아이템의 연결된 데이터를 올바르게 가져온다")
	@Test
	void returnCorrectDataWhenReadAll() {
		// given
		User user = createAndSaveUser(1);
		Boolean isSelected = true;
		Location location = createAndSaveLocation(user.getId(), isSelected);
		Category category = createAndSaveCategory();

		Item item = createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매중,
			user.getId(),
			location.getLocationName());
		int pageSize = 10;
		List<Favorite> favorites = new ArrayList<>();
		List<Chat> chats = new ArrayList<>();
		for (int i = 0; i < 2; i++) {
			favorites.add(createAndSaveFavorite(item.getId(), user.getId()));
			chats.add(createAndSaveChat(user.getId(), item.getId()));
		}

		// when
		ItemListSlice itemListSlice = itemService.readAll(null, category.getId(), pageSize, user.getLoginId());

		// then
		assertThat(itemListSlice.getItems().size()).isEqualTo(1);
		assertThat(itemListSlice.getCategoryName()).isEqualTo(category.getName());
		assertThat(itemListSlice.getUserLocation()).isEqualTo(location.getLocationName());
		assertThat(itemListSlice.getItems().get(0).getCountData().getFavorite()).isEqualTo(favorites.size());
		assertThat(itemListSlice.getItems().get(0).getCountData().getChat()).isEqualTo(chats.size());
		assertThat(itemListSlice.getNextCursor()).isEqualTo(null);
	}

	@DisplayName("관심품목 조회시 로그인한 유저가 관심품목으로 등록한 아이템 리스트를 가져온다")
	@Test
	void getFavoriteItemsTest() {
		// given
		User user = createAndSaveUser(1);
		Boolean isSelected = true;
		Location location = createAndSaveLocation(user.getId(), isSelected);
		Category category = createAndSaveCategory();

		int pageSize = 10;
		List<Item> items = new ArrayList<>();
		for (int i = 0; i < pageSize; i++) {
			items.add(createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매중, user.getId(),
				location.getLocationName()));
		}
		int favoriteCount = pageSize / 2;
		for (int i = 0; i < favoriteCount; i++) {
			createAndSaveFavorite(items.get(i).getId(), user.getId());
		}

		// when
		UserItemListSlice userItemListSlice = itemService.getFavoriteItems(null, null, pageSize, user.getLoginId());

		// then
		assertThat(userItemListSlice.getItems().size()).isEqualTo(favoriteCount);
	}

	@DisplayName("판매내역 조회시 로그인한 유저가 판매하는 아이템 리스트를 가져온다")
	@Test
	void getUserItemsTest() {
		// given
		User user = createAndSaveUser(1);
		User anotherUser = createAndSaveUser(2);
		Boolean isSelected = true;
		Location location = createAndSaveLocation(user.getId(), isSelected);
		Category category = createAndSaveCategory();

		int pageSize = 10;
		List<Item> userItems = new ArrayList<>();
		for (int i = 0; i < pageSize / 2; i++) {
			userItems.add(createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매중, user.getId(),
				location.getLocationName()));
		}
		for (int i = 0; i < pageSize; i++) {
			createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매중, anotherUser.getId(),
				location.getLocationName());
		}

		// when
		UserItemListSlice userItemListSlice = itemService.getUserItems(null, null, pageSize, user.getLoginId());

		// then
		assertThat(userItemListSlice.getItems().size()).isEqualTo(userItems.size());
	}

	@DisplayName("판매중이나 판매중이 아닌 조건으로 판매내역 조회시 로그인한 유저가 판매 아이템 리스트를 조건에 맞게 가져온다")
	@Test
	void getUserItemsByConditionTest() {
		// given
		User user = createAndSaveUser(1);
		Boolean isSelected = true;
		Location location = createAndSaveLocation(user.getId(), isSelected);
		Category category = createAndSaveCategory();
		Boolean isSold = true;

		int pageSize = 10;
		List<Item> sellingUserItems = new ArrayList<>();
		for (int i = 0; i < pageSize / 2; i++) {
			sellingUserItems.add(
				createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매중, user.getId(),
					location.getLocationName()));
		}
		for (int i = 0; i < pageSize / 3; i++) {
			sellingUserItems.add(
				createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.예약중, user.getId(),
					location.getLocationName()));
		}
		List<Item> soldUserItems = new ArrayList<>();
		for (int i = 0; i < pageSize / 3; i++) {
			soldUserItems.add(
				createAndSaveItem(category.getId(), location.getLocationId(), ItemStatus.판매완료, user.getId(),
					location.getLocationName()));
		}

		// when
		UserItemListSlice sellingUserItemListSlice = itemService.getUserItems(null, !isSold, pageSize,
			user.getLoginId());
		UserItemListSlice soldUserItemListSlice = itemService.getUserItems(null, isSold, pageSize,
			user.getLoginId());

		// then
		assertThat(sellingUserItemListSlice.getItems().size()).isEqualTo(sellingUserItems.size());
		assertThat(soldUserItemListSlice.getItems().size()).isEqualTo(soldUserItems.size());
	}

	User createAndSaveUser(int identifier) {
		String loginId = "loginId" + identifier;
		String password = "password";
		String nickname = "nickname" + identifier;
		String profileImageUrl = "profileImageUrl";
		return userRepository.save(User.builder()
			.loginId(loginId).password(password).nickname(nickname).profileImageUrl(profileImageUrl).build());
	}

	Location createAndSaveLocation(Long userId, Boolean isSelected) {
		Long locationId = (long)(Math.random() * 100) + 1;
		String locationName = "locationName";
		return locationRepository.save(Location.builder().locationId(locationId)
			.locationName(locationName).userId(userId).isSelected(isSelected).build());
	}

	Item createAndSaveItem(Long categoryId, Long locationId, ItemStatus status, Long userId, String locationName) {
		String title = "Sample Item";
		String content = "This is a sample item description.";
		Integer price = 100;
		String thumbnailUrl = "sample.jpg";
		int viewCount = 0;

		return itemRepository.save(Item.builder()
			.title(title)
			.content(content)
			.categoryId(categoryId)
			.price(price)
			.locationId(locationId)
			.locationName(locationName)
			.thumbnailUrl(thumbnailUrl)
			.status(status)
			.userId(userId)
			.viewCount(viewCount)
			.build());
	}

	Message createAndSaveMessage(Long chatId) {
		String content = "This is a sample message.";
		return messageRepository.save(Message.builder()
			.chatId(chatId)
			.content(content)
			.build());
	}

	Chat createAndSaveChat(Long senderId, Long itemId) {
		String lastMessage = "This is a sample message.";
		return chatRepository.save(Chat.builder().itemId(itemId).senderId(senderId).lastMessageId(lastMessage).build());
	}

	Category createAndSaveCategory() {
		String name = "category name";
		String iconName = "icon name";
		return categoryRepository.save(new Category(name, iconName));
	}

	Favorite createAndSaveFavorite(Long itemId, Long userId) {
		return favoriteRepository.save(Favorite.builder().itemId(itemId).userId(userId).build());
	}

}
