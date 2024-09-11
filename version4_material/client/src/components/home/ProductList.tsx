import { useEffect, useState } from "react";
import { ProductType } from "../../types/index";
import { ProductItem } from ".";
import { CircularProgress, Grid } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.products);
        setProducts(data.products);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
      ))}
    </Grid>
  );
};

export default ProductList;
