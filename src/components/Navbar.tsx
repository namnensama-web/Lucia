import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, login, logout, isAdmin } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: '首页', path: '/' },
    { label: '日记', path: '/blog' },
    { label: '相册', path: '/gallery' },
  ];

  // 处理登录
  const handleLogin = () => {
    const adminCode = prompt('请输入管理员代码以获取管理员权限:');
    
    if (adminCode !== null) {
      const isAdmin = login(adminCode);
      
      if (isAdmin) {
        toast.success('管理员登录成功！');
      } else {
        toast.success('普通用户登录成功！');
      }
    }
  };

  // 处理登出
  const handleLogout = () => {
    logout();
    toast.success('已登出');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <i className="fa-solid fa-book text-blue-600 dark:text-blue-400 text-2xl mr-2"></i>
              <span className="text-xl font-bold">我的博客</span>
            </Link>
          </div>
          
          {/* 桌面导航 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
               {/* 上传日记按钮（仅管理员显示） */}
              {isAuthenticated && isAdmin() && (
                <Link
                  to="/blog/upload"
                  className="inline-flex items-center px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <i className="fa-solid fa-plus mr-1.5"></i>
                  上传日记
                </Link>
              )}
              
              {/* 用户操作按钮 */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <i className="fa-solid fa-user mr-1.5"></i>
                  退出
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <i className="fa-solid fa-user mr-1.5"></i>
                  登录
                </button>
              )}
              
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="切换主题"
              >
                {theme === 'light' ? (
                  <i className="fa-solid fa-moon text-gray-700"></i>
                ) : (
                  <i className="fa-solid fa-sun text-yellow-400"></i>
                )}
              </button>
            </div>
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            {/* 用户操作按钮 */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="p-2 mr-1 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                aria-label="退出"
              >
                <i className="fa-solid fa-sign-out-alt"></i>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="p-2 mr-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="登录"
              >
                <i className="fa-solid fa-user"></i>
              </button>
            )}
            
            <button 
              onClick={toggleTheme} 
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="切换主题"
            >
              {theme === 'light' ? (
                <i className="fa-solid fa-moon text-gray-700"></i>
              ) : (
                <i className="fa-solid fa-sun text-yellow-400"></i>
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="主菜单"
            >
              <i className={`fa-solid text-xl ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
             {/* 上传日记选项（仅管理员显示） */}
            {isAuthenticated && isAdmin() && (
              <Link
                to="/blog/upload"
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-plus mr-2"></i>
                上传日记
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}