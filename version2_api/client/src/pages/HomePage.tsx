// HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

/*----------------- 타입 선언 부분 -------------------------*/

// ProductType 인터페이스는 각 제품의 속성을 정의합니다.
interface ProductType {
  id: string; // 제품의 고유 ID
  name: string; // 제품 이름
  explanation: string; // 제품 설명
  price: number; // 제품 가격
}

// ProductItemProps 인터페이스는 ProductItem 컴포넌트가 받는 props를 정의합니다.
interface ProductItemProps {
  product: ProductType; // 개별 제품 객체
  onDelete: (id: string) => void; // 제품을 삭제할 때 호출되는 함수
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
  const [products, setProducts] = useState<ProductType[]>([]);

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
        setProducts((prev) => [...prev, data.product]);
      });
  };

  // 특정 제품을 삭제하는 함수이며, filter를 이용해 새로운 상품 배열을 제공 받음
  // 이때의 조건은 삭제하고자 하는 제품의 id만을 뺀 나머지 상품 배열을 받아오는 거임
  const handleDelete = (id: string) => {
    fetch(`/product/${id}/`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    });
  };

  const handleUpdate = (updateProduct: ProductType) => {
    // 서버에 PUT 요청을 보내서 제품 데이터 업데이트
    fetch(`/product/${updateProduct.id}`, {
      method: "PATCH", // HTTP 메서드 patch를 사용하여 업데이트 요청
      headers: {
        "Content-Type": "application/json", // 요청의 본문이 JSON 형식임을 명시
      },
      body: JSON.stringify(updateProduct), // 업데이트할 제품 데이터를 JSON 문자열로 변환하여 요청의 본문으로 보냄
    }).then((response) => {
      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.id === updateProduct.id ? updateProduct : product
          )
        );
      }
    });
  };

  // 폼 입력값을 관리하는 상태들
  const [name, setName] = useState(""); // 제품 이름 입력 값
  const [explanation, setExplanation] = useState(""); // 제품 설명 입력 값
  const [price, setPrice] = useState(0); // 제품 가격 입력 값

  // 웹서버로부터 API를 호출
  useEffect(() => {
    fetch("/product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.products);
        setProducts(data.products);
      });
  }, []);

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
