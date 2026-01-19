import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import BlogList from "@/pages/BlogList";
import BlogDetail from "@/pages/BlogDetail";
import BlogUpload from "@/pages/BlogUpload";
import Gallery from "@/pages/Gallery";
import GalleryUpload from "@/pages/GalleryUpload";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/authContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const [pageTitle, setPageTitle] = useState('我的个人博客 - 记录生活的点滴');
  
  // 从localStorage加载页面标题
  useEffect(() => {
    const storedTitle = localStorage.getItem('siteTitle');
    if (storedTitle) {
      setPageTitle(storedTitle);
      document.title = storedTitle;
    }
  }, []);
  
  // 如果是管理员，添加编辑网站标题的按钮
  if (isAuthenticated && isAdmin()) {
    document.addEventListener('keydown', (e) => {
      // 按Ctrl+Shift+E显示编辑标题对话框（仅在管理员登录时可用）
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        const newTitle = prompt('请输入网站标题:', pageTitle);
        if (newTitle !== null) {
          localStorage.setItem('siteTitle', newTitle);
          setPageTitle(newTitle);
          document.title = newTitle;
        }
      }
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blog/upload" element={<BlogUpload />} />
          <Route path="/blog/upload/:id" element={<BlogUpload />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/upload" element={<GalleryUpload />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
