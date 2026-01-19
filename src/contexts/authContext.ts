import { createContext, useState } from "react";

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
  isAdmin: () => false
});

// 管理员验证码
const ADMIN_CODE = "lucia7mn";

// 创建一个自定义的AuthProvider组件，方便在实际应用中使用
export const useAuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  // 初始化时从localStorage加载认证状态
  useState(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setIsAuthenticated(authData.isAuthenticated);
        setUser(authData.user);
      } catch (error) {
        console.error("Failed to load auth data:", error);
      }
    }
  });

  const login = (adminCode?: string): boolean => {
    // 检查是否提供了管理员代码且代码正确
    const isAdminUser = adminCode === ADMIN_CODE;
    
    setIsAuthenticated(true);
    setUser({
      id: isAdminUser ? "admin-123" : "user-123",
      name: isAdminUser ? "管理员" : "普通用户",
      email: isAdminUser ? "admin@example.com" : "user@example.com",
      role: isAdminUser ? "admin" : "user"
    });
    
    // 保存到localStorage
    localStorage.setItem("auth", JSON.stringify({
      isAuthenticated: true,
      user: {
        id: isAdminUser ? "admin-123" : "user-123",
        name: isAdminUser ? "管理员" : "普通用户",
        email: isAdminUser ? "admin@example.com" : "user@example.com",
        role: isAdminUser ? "admin" : "user"
      }
    }));
    
    return isAdminUser;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    localStorage.removeItem("auth");
  };

  // 判断是否为管理员
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    user,
    isAdmin
  };
};