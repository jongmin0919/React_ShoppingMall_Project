// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage , ProductCreatePage, ProductPage} from "./pages";
import { Layout } from "./components/shared"

/*
1. Routes: 여러 Route를 감싸는 컨테이너 컴포넌트로, 현재 URL과 일치하는 경로를 찾아서 해당 컴포넌트를 렌더링함.
2. Route: 특정 경로에 맞는 컴포넌트를 지정함. 
2-1. 첫 번째 Route는 HomePage 컴포넌트를 지정하고, 경로는 "/"(루트)로 설정됨.
2-2. 두 번째 Route는 ProductPage 컴포넌트를 지정하고, 경로는 "/:productId"로 설정됨.
     여기서 ":"는 "productId"가 동적 매개변수(parameter)임을 의미함. 따라서, URL 경로의 일부로서 동적으로 결정됨.
3. 사용자가 특정 Link 태그를 클릭했을 때, `to` 속성에 지정된 경로에 따라 라우터가 적절한 Route 컴포넌트를 찾음.
4. React Router는 정의된 순서대로 Route를 검사하고, 먼저 일치하는 경로를 찾으면 그 컴포넌트를 렌더링함.
   만약 여러 경로가 동일한 개수의 경로 세그먼트를 가지고 있다면, 정의된 순서대로 상단에 있는 Route가 먼저 매칭됨.
5. "useParams"는 동적 경로 매개변수를 가져오기 위해 사용되며, 동적 경로를 갖는 컴포넌트에서 경로에 포함된 매개변수의 값을 가져올 수 있게 함.

Layout : 해당 훅에서 이미 선언한 아이템 정보 보여주는 컴포넌트
*/

function App() {
  return (
    <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="create" element={<ProductCreatePage/>} />
          <Route path="/:productId" element={<ProductPage />} />
        </Routes>
    </Layout>
  );
}

export default App;
