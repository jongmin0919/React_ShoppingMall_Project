// ProductPage.tsx

import { useProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";

function ProductPage(){
    // React Router에서 경로의 동적 매개변수를 가져오기 위해 사용하는 훅으로
    // ProductPage 컴포넌트의 경로가 `/:productId`로 설정되어 있으므로,
    // 사용자가 특정 링크를 클릭 했을 때 전달되는 매개변수를 받아와 비교할 수 있는 역할을 함
    const { productId } = useParams<{productId : string}>();
    // productContext.tsx의 커스텀 훅을 이용해 아이템 목록(컨텍스트)만 가져와 products에 할당
    const [products] = useProductContext();
    // find에 사용된 옵셔널 체이닝(!)으로 해당 값이 null, 또는 undefined가 아님을 확신하게함
    // 그 이유는 useParams를 이용해 받아온 경로 매개변수의 타입은 기본적으로 String | undefined 타입이기 때문에
    // parseInt 메서드 호출시 지정 가능한 매개변수 타입을 String 한정으로 지정해주기 위해 
    // 옵셔널 체이닝을 붙여 컴파일러에게 " 이 메서드를 사용할 건데 현재 productId의 타입은 null이거나 undefined일리가 없다"
    // 라고 알려주는 의미가 됨.
    // 아무튼 아래의 작업을 이용해 사용자가 클릭한 제품 이름의 id와 현재 컨텍스트에서 관리중인 상품 배열의 상품들의 id중
    // 일치하는 id를 가지고 있는 상품(product)을 반환함
    const foundProduct = products.find(product => product.id === parseInt(productId!, 10));

    // foundProduct가 undefined인 상태, 즉 해당 상품을 찾지 못한 상태일 경우 
    // 아래의 html문을 리턴
    if(!foundProduct){
        return <h1>찾으시는 상품이 없습니다.</h1>
    }

    //위 if문에 걸리지 않은 경우 반환된 상품(foundProduct)의 이름과 설명, 가격을 표시
    // 이때 혹시라도 해당 속성이 undefined(없는 상태) 일 수 있으니 ? 옵셔널 체이닝을 추가
    return(
        <div>
            <h1>{foundProduct?.name}</h1>
            <p>{foundProduct?.explanation}</p>
            <span>{foundProduct?.price}</span>
        </div>
    )
}

export default ProductPage;