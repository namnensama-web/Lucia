// src/contexts/authContext.ts
import { createContext, useState, useEffect } from "react";

// 定义用户角色类型
type UserRole = 'admin' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (adminCode?: string) => boolean;
  logout: () => void;
  user?: User;
  // 添加管理员判断方法
  isAdmin: () => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => false,
  logout: () => {},
  isAdmin: () => false,
});

// 管理员验证码
const ADMIN_CODE = "lucia7mn";

// 自定义 Hook，提供认证状态和方法
export const useAuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  // 从 localStorage 加载初始认证状态（只在组件挂载时执行一次）
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(authData.isAuthenticated ?? false);
        setUser(authData.user ?? undefined);
      } catch (error) {
        console.error("Failed to load auth data from localStorage:", error);
      }
    }
  }, []); // 空依赖数组，只执行一次

  const login = (adminCode?: string): boolean => {
    const isAdminUser = adminCode === ADMIN_CODE;

    setIsAuthenticated(true);

    const newUser: User = {
      id: isAdminUser ? "admin-123" : "user-123",
      name: isAdminUser ? "管理员" : "普通用户",
      email: isAdminUser ? "admin@example.com" : "user@example.com",
      role: isAdminUser ? "admin" : "user",
    };

    setUser(newUser);

    // 保存到 localStorage
    localStorage.setItem(
      "auth",
      JSON.stringify({
        isAuthenticated: true,
        user: newUser,
      })
    );

    return isAdminUser;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    localStorage.removeItem("auth");
  };

  // 判断是否为管理员
  const isAdmin = () => {
    return user?.role === "admin";
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    user,
    isAdmin,
  };
};