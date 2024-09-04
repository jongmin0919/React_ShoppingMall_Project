// HomePage.tsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";


/*----------------- 타입 선언 부분 -------------------------*/
interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
  onDelete: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}

/*----------------- ProductItem 컴포넌트 -------------------------*/
const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplnation, setEditExplnation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div>
      <div>{id}</div>
      <div>
        <Link to={`/${id}`}>{name}</Link>
      </div>
      <div>{price}</div>
      <div>{explanation}</div>
      <button type="button" onClick={() => onDelete(id)}>
        삭제하기
      </button>
      <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
        수정하기
      </button>
      {isEditMode && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
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
          <input type="submit" value="상품 수정하기" />
        </form>
      )}
    </div>
  );
};

/*----------------- App.tsx 메인 부분 -------------------------*/
function HomePage() {
  const [products, setProducts] = useProductContext();
  const fakeId = useRef(0);
  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fakeId.current++;
    setProducts([
      ...products,
      {
        ...newProduct,
        id: fakeId.current,
      },
    ]);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

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
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <>
      <h1>쇼핑몰 앱 만들어보기</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate({ name, explanation, price });
        }}
      >
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          type="text"
          placeholder="상품 이름"
        />
        <input
          value={explanation}
          onChange={(event) => {
            setExplanation(event.target.value);
          }}
          type="text"
          placeholder="상품 설명"
        />
        <input
          value={price}
          onChange={(event) => {
            setPrice(Number(event.target.value));
          }}
          type="number"
          placeholder="상품 가격"
        />
        <input type="submit" placeholder="상품 만들기" />
      </form>

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
