//index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CssBaseline } from "@mui/material";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/*
1. React.StrictMode : 엄격 관리 컴포넌트
2. ProductProvider : 하위 자식들에게 컨텍스트를 제공하는 함수로서 
3. BrowserRouter : 해당 컴포넌트의 하위 컴포넌트들이 React-router-dom 기능을 쓸 수 있게 해주는 컴포넌트
4. CssBaseline : 웹브라우저 환경에 상관 없이 동일한 Material UI 스타일을 제공하는 컴포넌트
*/
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <CssBaseline/>
    </BrowserRouter>
  </React.StrictMode>
);
