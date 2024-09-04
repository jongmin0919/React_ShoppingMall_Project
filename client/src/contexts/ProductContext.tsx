// ProductContext.tsx
import { createContext, useContext } from "react";
import { useState } from 'react';

interface ProductType{
    id : number;
    name : string;
    explanation : string;
    price : number;
}

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
]

// 컨텍스트를 하위 컴포넌트에 제공하는 함수 
export function ProductProvider({children} : {children: React.ReactNode}){
    const productState = useState<ProductType[]>(initialValue);
    return (
        <ProductContext.Provider value={productState}>
            {children}
        </ProductContext.Provider>        
    )
}

// ProductContext 컨텍스트 사용을 위한 useContext 호출을 좀 더 쉽게 해주는 커스텀 훅
// 예를 들어 사용자가 해당 컨텍스트 사용을 위해서는
// const contextValue = useContext(ProductContext);를 사용해야 하나 좀 더 존속성을 떨어트리기 위해
// const products = useProductContext(); 이런 식으로 사용할 수 있음.
export function useProductContext(){
    return useContext(ProductContext) as ProductContextType;
}