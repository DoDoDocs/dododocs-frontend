class Product {
  constructor(id, name, description, originalPrice, discount, thumbnailImg) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.originalPrice = originalPrice;
    this.discount = discount;
    this.thumbnailImg = thumbnailImg;
    this.sellingPrice = this.calculateSellingPrice();
  }

  calculateSellingPrice() {
    return Math.floor(this.originalPrice * (100 - this.discount) / 100);
  }
}

const monkData = [new Product(
  14,
  "킷캣 미니 오리지널 초코 웨이퍼 405g",
  "넉넉히 즐기는 달콤한 간식",
  13980,
  12,
  "https://raw.githubusercontent.com/Kakaotech-18-Ecommerce/Kakaotech-18-AI/develop/data_image/image_14_1.JPG"
), new Product(
  20,
  "김보람 생 초콜릿 추천 4종",
  "사르르 녹는 달콤한",
  11000,
  12,
  "https://raw.githubusercontent.com/Kakaotech-18-Ecommerce/Kakaotech-18-AI/develop/data_image/image_20_1.JPG"
), new Product(
  18,
  "킨더 초콜릿바 미니 20개입",
  "한입 크기로 완성한 달콤한",
  4780,
  35,
  "https://raw.githubusercontent.com/Kakaotech-18-Ecommerce/Kakaotech-18-AI/develop/data_image/image_18_1.JPG"
), new Product(
  11,
  "쁘티첼 과일젤리 오거젤리 큰컵 6종 골라담기",
  "사르르 녹는 달콤한",
  2000,
  20,
  "https://raw.githubusercontent.com/Kakaotech-18-Ecommerce/Kakaotech-18-AI/develop/data_image/image_11_1.JPG"
), new Product(
  17,
  "부샤드 밸지안 초콜릿 3종",
  "오득오득 식감의 진한 초콜릿",
  6480,
  0,
  "https://raw.githubusercontent.com/Kakaotech-18-Ecommerce/Kakaotech-18-AI/develop/data_image/image_17_1.JPG"
), new Product(
  15,
  "닥터유 프로미니 단백갑 280g 2종",
  "달콤하게 즐기는 단백질 간식",
  7780,
  0,
  "https://raw.githubusercontent.com/Kakaotech-18-Ecommerce/Kakaotech-18-AI/develop/data_image/image_15_1.JPG"
)

];

export default monkData;