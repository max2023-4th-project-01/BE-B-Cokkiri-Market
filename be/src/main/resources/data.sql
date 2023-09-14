DELETE FROM category;
ALTER TABLE category ALTER COLUMN id RESTART WITH 1;
INSERT INTO category (name, icon_name) VALUES
   ('디지털기기', 'icon_digital'),
   ('생활가전', 'icon_appliance'),
   ('가구/인테리어', 'icon_furniture'),
   ('생활/주방', 'icon_kitchen'),
   ('유아동', 'icon_baby'),
   ('유아도서', 'icon_babybook'),
   ('여성의류', 'icon_clothes'),
   ('여성잡화', 'icon_accessories'),
   ('남성패션/잡화', 'icon_man'),
   ('뷰티/미용', 'icon_beauty'),
   ('스포츠/레저', 'icon_sports'),
   ('취미/게임/음반', 'icon_hobby'),
   ('중고차', 'icon_car'),
   ('티켓/교환권', 'icon_ticket'),
   ('가공식품', 'icon_food'),
   ('반려동물식품', 'icon_pet'),
   ('식물', 'icon_plant'),
   ('기타중고물품', 'icon_etc');
