import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App";
import "./index.css";
import { useAuthProvider, AuthContext } from './contexts/authContext';
import { useState } from 'react';

// 创建自定义的AuthProvider组件包装器
function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  // 使用我们的自定义Hook获取认证状态和方法
  const authContextValue = useAuthProvider();
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <App />
        <Toaster />
      </AuthProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);
