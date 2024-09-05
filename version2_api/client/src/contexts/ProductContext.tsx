// ProductContext.tsx
/* 
createContext는 새로운 Context 객체를 생성하는 함수를 의미하는데
이 함수는 Provider와 Consumer 두 속성으로 구성되어 있다.
그 중 Provider는 
 */

import { createContext, useContext } from "react";
import { useState } from "react";

//각각의 상품 타입
interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

//ProductContextType 타입을 튜플로 설정하고 첫번째는 ProductType 배열을,
//두번째는 상태를 변경할 때 사용하는 함수의 타입을 지정함.
// 즉 해당 타입은 상품 배열과 해당 상품 배열을 관리하는 함수를 가지고 있는 타입을 의미함
type ProductContextType = [
  ProductType[],
  React.Dispatch<React.SetStateAction<ProductType[]>>
];

const ProductContext = createContext<ProductContextType | null>(null);

const initialValue: ProductType[] = [
  {
    id: 0,
    name: "Iphone 13 Max",
    explanation:
      "디스플레이는 6.1인치 19.5:9 비율의 어쩌고 저쩌고 해상도를 지원합니다",
    price: 1230000,
  },
];
/*
 컨텍스트를 하위 컴포넌트에 제공하는 함수로서
여기서 children(하위 자식 요소)의 매개변수를 전달받지는 않을 것이나
실제로는 자식 요소들을 포괄해야 하므로 매개변수로 설정하고 타입 또한
React.ReactNode(모든 타입을 포괄할 수 있는 TS 타입) 으로 설정함
*/
export function ProductProvider({ children }: { children: React.ReactNode }) {
  // 제공하는 값으로 productState를 지정하는데, 여기서 productState 타입을
  // 위에 선언해놓은 ProductContextType으로 지정을 하게 됨.
  // 이렇게 명시적으로 지정해 놓으면, 우리가 일반적으로 생성하는 useState 방식과는 달리
  // 자식 컴포넌트들에게 전달할 컨텍스트로 상품 배열 상태와 관리 함수까지 통으로 넘겨줄 수 있게됨
  const productState: ProductContextType =
    useState<ProductType[]>(initialValue);
  return (
    // 정보 제공을 하는 속성으로 자식들에게 value를 전달함
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
}

// ProductContext 컨텍스트 사용을 위한 useContext 호출을 좀 더 쉽게 해주는 커스텀 훅
// 예를 들어 사용자가 해당 컨텍스트 사용을 위해서는
// const contextValue = useContext(ProductContext);를 사용해야 하나 좀 더 존속성을 떨어트리기 위해
// const products = useProductContext(); 이런 식으로 사용할 수 있음.
// 또한 여기서 ProductContextType의 타입까지 지정하고 있기 때문에
// 해당 컴포넌트에서 타입 지정까지 깔끔하게 해주기 위해서 커스텀 훅을 만들음
export function useProductContext() {
  return useContext(ProductContext) as ProductContextType;
}
