// ProductPage.tsx

import { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";

function ProductPage() {
  type ProductType = {
    id: string;
    name: string;
    explanation: string;
    price: number;
  };

  // React Router에서 경로의 동적 매개변수를 가져오기 위해 사용하는 훅으로
  // ProductPage 컴포넌트의 경로가 `/:productId`로 설정되어 있으므로,
  // 사용자가 특정 링크를 클릭 했을 때 전달되는 매개변수를 받아와 비교할 수 있는 역할을 함
  const { productId } = useParams<{ productId: string }>();
  // productContext.tsx의 커스텀 훅을 이용해 아이템 목록(컨텍스트)만 가져와 products에 할당
  const [product, setProduct] = useState<ProductType | null>(null);

  // useEffect는 컴포넌트가 처음 렌더링 될 때 한번만 실행되는 화면이므로
  // fetch에 productId를 이용해 get방식으로 서버에 자료를 요청한 뒤 얻어온 응답 상태를 이용해
  // 성공했을 경우 해당 데이터를 setProduct 스테이트 관리 함수로 얻어온 데이터의 product를 할당함
  // 이떄 productId를 초기값으로 설정해야 fetch의 productId로 잘 활용할 수 있음
  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.product));
  }, [productId]);

  if (!product) {
    return <h1>찾으시는 상품이 없습니다.</h1>;
  }

  //위 if문에 걸리지 않은 경우 반환된 상품(foundProduct)의 이름과 설명, 가격을 표시
  // 이때 혹시라도 해당 속성이 undefined(없는 상태) 일 수 있으니 ? 옵셔널 체이닝을 추가
  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.explanation}</p>
      <span>{product?.price}</span>
    </div>
  );
}

export default ProductPage;
