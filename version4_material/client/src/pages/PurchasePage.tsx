import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import type { ProductType } from '../types';
import { API_SERVER_DOMAIN } from '../constants';
import { PurchaseForm } from '../components/purchase'; 
 
type ParamsType = {
    productId: string,
}

const PurchasePage = () => {
    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<ProductType | null>(null); // 초기값 설정

    useEffect(() => {
        fetch(`/product/${productId}`) // 백틱으로 문자열 템플릿 사용
            .then(response => response.json())
            .then(data => setProduct(data.product));
    }, [productId]);

    if (!product) {
        return <h1>찾으시는 상품이 없습니다.</h1>
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                구매하기
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs = {12}>
                    <Card sx={{ display: "flex", marginBottom: 2 }}>
                        {product?.thumbnail && (
                            <CardMedia sx={{ width: 100, height: 100, marginRight: 2 }} image={`${API_SERVER_DOMAIN}/${product?.thumbnail}`} title="Product" />
                        )}
                        <CardContent>
                            <Typography variant="h6">{product?.name}</Typography>
                        </CardContent>
                    </Card>
                    <PurchaseForm/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PurchasePage;
