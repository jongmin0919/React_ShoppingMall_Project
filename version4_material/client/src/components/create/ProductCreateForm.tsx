import { useState } from "react";
import { ProductType } from "../../types";
import {Button, Container, TextField, Typography} from "@mui/material";
const ProductCreateForm = () => {
    // 폼 입력값을 관리하는 상태들
  const [name, setName] = useState(""); // 제품 이름 입력 값
  const [explanation, setExplanation] = useState(""); // 제품 설명 입력 값
  const [price, setPrice] = useState(0); // 제품 가격 입력 값

  // 상품 생성을 누를 경우 서버에 요청할 때 요청 정보가 url에 기록이 되면 안되기 때문에
  // post 방식으로 정보를 담아줘서 요청을 해야함
  const handleCreate = (event : React.FormEvent) => {
    event.preventDefault()
    const newProduct: Omit<ProductType, "id"> = {
      name,
      explanation,
      price
    }
    fetch(`/product`, {
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
      <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        상품 생성
      </Typography>
      <form onSubmit={handleCreate}>
        <TextField label = "상품 이름" fullWidth value = {name} onChange={e => {
          setName(e.target.value)
        }} margin="normal">
        </TextField>
        <TextField label = "상품 설명" fullWidth multiline rows={4} value = {explanation} onChange={e => {
          setExplanation(e.target.value)
        }} margin="normal">
        </TextField>
        <TextField label = "상품 가격" type="number" fullWidth value = {price} onChange={e => {
          setPrice(Number(e.target.value))
        }} margin="normal">
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop:6}}>
          생성
        </Button>
      </form>
      </Container>
    </>
  );
}

export default ProductCreateForm