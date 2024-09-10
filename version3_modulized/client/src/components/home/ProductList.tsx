import { useEffect, useState } from "react";
import { ProductType } from "../../types/index";
import { ProductItem } from "./";

const ProductList = () => {
  // useProductContext 훅을 사용하여 컨텍스트에서 제품 목록과 제품 목록을 업데이트하는 함수를 가져옴
  const [products, setProducts] = useState<ProductType[]>([]);

  // 특정 제품을 삭제하는 함수이며, filter를 이용해 새로운 상품 배열을 제공 받음
  // 이때의 조건은 삭제하고자 하는 제품의 id만을 뺀 나머지 상품 배열을 받아오는 거임
  const handleDelete = (id: string) => {
    fetch(`/product/${id}/`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
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
    <div>
      {/* 제품 목록을 표시하는 ProductItem 컴포넌트를 렌더링 */}
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default ProductList;
