package kr.codesquad.chat.dto.response;

import kr.codesquad.util.ItemStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
public class ChatRoomDetailResponse {

    private ItemInfo item;
    private ChatMember chatMember;
    private List<Message> messages;
    private Long nextCursor;

    public ChatRoomDetailResponse(Long id, String title, Integer price, ItemStatus status, String thumbnailUrl, String nickname) {
        this.item = new ItemInfo(id, title, price, status, thumbnailUrl);
        this.chatMember = new ChatMember(nickname);
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void setNextCursor(Long nextCursor) {
        this.nextCursor = nextCursor;
    }

    @Getter
    @AllArgsConstructor
    public static class ItemInfo {
        private Long id;
        private String title;
        private Integer price;
        private ItemStatus status;
        private String thumbnailUrl;
    }

    @Getter
    @AllArgsConstructor
    public static class ChatMember {
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Message {
        private Long id;
        private Boolean isSent;
        private String content;
    }
}
