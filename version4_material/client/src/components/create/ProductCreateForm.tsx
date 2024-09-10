import { useState } from "react";
import { ProductType } from "../../types";

const ProductCreateForm = () => {
    // 폼 입력값을 관리하는 상태들
  const [name, setName] = useState(""); // 제품 이름 입력 값
  const [explanation, setExplanation] = useState(""); // 제품 설명 입력 값
  const [price, setPrice] = useState(0); // 제품 가격 입력 값

  // 상품 생성을 누를 경우 서버에 요청할 때 요청 정보가 url에 기록이 되면 안되기 때문에
  // post 방식으로 정보를 담아줘서 요청을 해야함
  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fetch(`product`, {
      method: "post",
      headers: {
        // 보내는 본문 타입이 json 타입임을 명시
        "Content-Type": "application/json",
      },
      // 실제 데이터는 사용자가 입력한 newProduct 정보를 json 직렬화 시킨 문자열을 보냄
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <h1>쇼핑몰 앱 만들어보기</h1>

      {/* 새로운 제품을 생성하는 폼 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // 새로운 제품을 생성할 때 handleCreate 함수 호출
          handleCreate({ name, explanation, price });
        }}
      >
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value); // 제품 이름 입력 값 업데이트
          }}
          type="text"
          placeholder="상품 이름"
        />
        <input
          value={explanation}
          onChange={(event) => {
            setExplanation(event.target.value); // 제품 설명 입력 값 업데이트
          }}
          type="text"
          placeholder="상품 설명"
        />
        <input
          value={price}
          onChange={(event) => {
            setPrice(Number(event.target.value)); // 제품 가격 입력 값 업데이트
          }}
          type="number"
          placeholder="상품 가격"
        />
        <input type="submit" placeholder="상품 만들기" />
      </form>

    </>
  );
}

export default ProductCreateForm