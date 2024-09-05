// HomePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

/*----------------- 타입 선언 부분 -------------------------*/

// ProductType 인터페이스는 각 제품의 속성을 정의합니다.
interface ProductType {
  id: number; // 제품의 고유 ID
  name: string; // 제품 이름
  explanation: string; // 제품 설명
  price: number; // 제품 가격
}

// ProductItemProps 인터페이스는 ProductItem 컴포넌트가 받는 props를 정의합니다.
interface ProductItemProps {
  product: ProductType; // 개별 제품 객체
  onDelete: (id: number) => void; // 제품을 삭제할 때 호출되는 함수
  onUpdate: (product: ProductType) => void; // 제품 정보를 수정할 때 호출되는 함수
}

/*----------------- ProductItem 컴포넌트 -------------------------*/
const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
  // 개별 제품의 속성들 (구조 분해 할당으로 가져옴)
  const { id, name, price, explanation } = product;

  // 제품 편집 모드 여부를 나타내는 상태
  const [isEditMode, setIsEditMode] = useState(false);
  // 편집할 제품의 속성들을 관리하는 상태
  const [editName, setEditName] = useState(product.name);
  const [editExplnation, setEditExplnation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  /*
  Link는 react-router-dom이 제공하는 컴포넌트로, a 태그와 달리 페이지가 새로고침되지 않고 
  클라이언트 측에서 SPA(Single Page Application)의 장점을 유지하면서 경로를 변경할 수 있게 해줍니다.
  */
  return (
    <div>
      <div>{id}</div>
      <div>
        {/* 제품 이름을 클릭하면 해당 제품의 상세 페이지로 이동 */}
        <Link to={`/${id}`}>{name}</Link>
      </div>
      <div>{price}</div>
      <div>{explanation}</div>
      {/* 제품 삭제 버튼 */}
      <button type="button" onClick={() => onDelete(id)}>
        삭제하기
      </button>
      {/* 제품 수정 모드 상태값을 토글하는 버튼 */}
      <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
        수정하기
      </button>
      {/* 수정 모드일 때 보이는 폼으로 isEditMode 스테이트가 false면 아래의 컴포넌트들은 안보임*/}
      {isEditMode && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // 수정된 정보를 상위 컴포넌트로 전달하여 상태를 업데이트
            onUpdate({
              id,
              name: editName,
              explanation: editExplnation,
              price: editPrice,
            });
          }}
        >
          <input
            type="text"
            placeholder="상품 이름"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
          <input
            type="text"
            placeholder="상품 설명"
            value={editExplnation}
            onChange={(event) => setEditExplnation(event.target.value)}
          />
          <input
            type="number"
            placeholder="상품 가격"
            value={editPrice}
            onChange={(event) => setEditPrice(Number(event.target.value))}
          />
          {/* 수정 완료 버튼 */}
          <input type="submit" value="상품 수정하기" />
        </form>
      )}
    </div>
  );
};

/*----------------- HomePage 컴포넌트 -------------------------*/

function HomePage() {
  // useProductContext 훅을 사용하여 컨텍스트에서 제품 목록과 제품 목록을 업데이트하는 함수를 가져옴
  const [products, setProducts] = useProductContext();

  // 새로운 제품을 생성할 때 사용할 임시 ID를 관리하는 ref
  const fakeId = useRef(0);

  // 새로운 제품을 생성하는 함수인데
  // 여기서 새로운 제품의 타입을 기존의 ProductType에 id를 제외한 나머지 속성으로 지정함
  // 이는 기존의 ProductType의 속성 중 id에 대한 타입 또한 지정되어 있기 때문에
  // 제품을 추가할 경우 id값은 해당 HomePage에서 관리하고 있는 useRef의 값을 이용해야 하기 때문임.
  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fakeId.current++; // 새로운 제품의 ID를 생성
    setProducts([
      ...products, // 기존 제품 목록
      {
        ...newProduct,
        id: fakeId.current, // 새로운 ID를 가진 제품 추가
      },
    ]);
  };

  // 특정 제품을 삭제하는 함수이며, filter를 이용해 새로운 상품 배열을 제공 받음
  // 이때의 조건은 삭제하고자 하는 제품의 id만을 뺀 나머지 상품 배열을 받아오는 거임
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // 특정 제품을 업데이트하는 함수로
  // 사용자가 입력한 상품을 받아 수정하고자 하는 상품의 id와 기존 id가 동일한 경우
  // 수정할 상품 정보를 반환하고, 그렇지 않은 경우, 즉 기존의 상품들일 경우 그대로 반환함
  const handleUpdate = (updateProduct: {
    id: number;
    name: string;
    explanation: string;
    price: number;
  }) => {
    setProducts(
      products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      )
    );
  };

  // 폼 입력값을 관리하는 상태들
  const [name, setName] = useState(""); // 제품 이름 입력 값
  const [explanation, setExplanation] = useState(""); // 제품 설명 입력 값
  const [price, setPrice] = useState(0); // 제품 가격 입력 값

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

      {/* 제품 목록을 표시하는 ProductItem 컴포넌트를 렌더링 */}
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
}

export default HomePage;
