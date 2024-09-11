// ProductType 인터페이스는 각 제품의 속성을 정의합니다.
export interface ProductType {
    id: string; // 제품의 고유 ID
    name: string; // 제품 이름
    explanation: string; // 제품 설명
    price: number; // 제품 가격
    thumbnail? : string;
}

