import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER_DOMAIN } from "../constants";
import { ProductType } from "../types";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";  // Material-UI 컴포넌트 추가
import { Delete, Edit } from "@mui/icons-material";

function ProductPage() {
  
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);

  const handlePushPurchasePage = () => {
    if(productId){
      navigate(`/purchase/${productId}`)
    }
  }

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
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        {product?.thumbnail && (
          <img
            src={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
            alt={product?.name}
            style={{ width: "100%", maxWidth: 400 }}
          />
        )}
      </Box>
      <Box sx = {{display: "flex", alignItems : "center", justifyContent : "space-between", marginBottom : 2}}>
        <Typography variant = "h4" sx = {{fontWeight : 'bold'}}>
          {product?.name}
        </Typography>
        <ButtonGroup orientation = "horizontal">
          <Button variant = "text" onClick = {() => null} color = "error">
            <Delete/>
          </Button>
          <Button variant = "text" onClick = {() => null} color = "info">
            <Edit/>
          </Button>
        </ButtonGroup>
      </Box>
      <Typography variant = "h6" sx = {{marginBottom : 4}}>
        {product?.price.toLocaleString('KO-kr')} 원
      </Typography>
      <Typography variant = "body1" sx = {{marginBottom : 4}}>
        {product?.explanation}
      </Typography>

      <ButtonGroup orientation = "vertical" fullWidth>
          <Button variant = "outlined">
            장바구니 담기
          </Button>
          <Button variant = "contained" onClick={handlePushPurchasePage}>
            구매하기
          </Button>
        </ButtonGroup>
    </>
  );
}

export default ProductPage;
