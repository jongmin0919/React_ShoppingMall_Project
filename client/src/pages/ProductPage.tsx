// ProductPage.tsx

import { useProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";

function ProductPage(){
    // React Router에서 경로의 동적 파라미터를 가져오는 훅
    const { productId } = useParams<{productId : string}>();
    // 컨텍스트를 이용해 아이템 목록을 가져옴
    const [products] = useProductContext();
    // find에 사용된 옵셔널 체이닝(!)으로 해당 값이 null, 또는 undefined가 아님을 확신하는
    const foundProduct = products.find(product => product.id === parseInt(productId!, 10));

    // foundProduct가 undefined인 경우 
    if(!foundProduct){
        return <h1>찾으시는 상품이 없습니다.</h1>
    }

    return(
        <div>
            <h1>{foundProduct?.name}</h1>
            <p>{foundProduct?.explanation}</p>
            <span>{foundProduct?.price}</span>
        </div>
    )
}

export default ProductPage;