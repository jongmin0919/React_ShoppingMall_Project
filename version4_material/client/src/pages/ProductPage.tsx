import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_SERVER_DOMAIN } from "../constants";
import { Box } from "@mui/material";  // Material-UI 컴포넌트 추가

function ProductPage() {
  type ProductType = {
    id: string;
    name: string;
    explanation: string;
    price: number;
    thumbnail?: string; // Optional thumbnail field 추가
  };

  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProduct(data.product))
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct(null);  // 에러 발생 시 제품을 null로 설정
      });
  }, [productId]);

  if (!product) {
    return <h1>찾으시는 상품이 없습니다.</h1>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      {product?.thumbnail && (
        <img
          src={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
          alt={product?.name}
          style={{ width: "100%", maxWidth: 400 }}
        />
      )}
      <div>
        <h1>{product?.name}</h1>
        <p>{product?.explanation}</p>
        <span>{product?.price}</span>
      </div>
    </Box>
  );
}

export default ProductPage;
