import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../types/index"

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

  export default ProductItem;

