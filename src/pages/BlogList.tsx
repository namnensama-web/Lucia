import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts, BlogPost } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function BlogList() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  
  // 加载用户上传的文章和模拟文章
  useEffect(() => {
    try {
      // 获取用户上传的文章
      const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
      // 合并模拟文章和用户上传的文章
      const mergedPosts = [...userPosts, ...blogPosts];
      // 按日期排序，最新的在前面
      mergedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAllPosts(mergedPosts);
    } catch (error) {
      console.error('加载文章失败:', error);
      setAllPosts(blogPosts);
    }
  }, []);
  
  // 处理删除文章
  const handleDelete = (postId: string) => {
    if (window.confirm("确定要删除这篇文章吗？此操作不可恢复。")) {
      try {
        const userPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");
        const filteredPosts = userPosts.filter((p: BlogPost) => p.id !== postId);
        localStorage.setItem("userPosts", JSON.stringify(filteredPosts));
        
        // 更新当前列表
        const updatedPosts = allPosts.filter(post => post.id !== postId);
        setAllPosts(updatedPosts);
        
        toast.success("文章已删除");
      } catch (error) {
        toast.error("删除失败，请重试");
        console.error("删除文章失败:", error);
      }
    }
  };
  
  // 获取所有分类
  const categories = ['全部', ...Array.from(new Set(allPosts.map(post => post.category)))];
  
  // 根据分类筛选文章
  const filteredPosts = selectedCategory === '全部' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          我的日记
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
        >
          记录生活中的每一个美好瞬间，分享我的思考与感悟
        </motion.p>
        
        {/* 上传日记按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
           <AuthContext.Consumer>
            {({ isAuthenticated, isAdmin }) => (
              isAuthenticated && isAdmin() && (
                <Link 
                  to="/blog/upload" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <i className="fa-solid fa-plus mr-2"></i>
                  上传新日记
                </Link>
              )
            )}
          </AuthContext.Consumer>
        </motion.div>
      </div>

      {/* 分类筛选 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10 overflow-x-auto"
      >
        <div className="flex space-x-2 pb-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 博客文章列表 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-8"
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <motion.article 
              key={post.id}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                     <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">
                          {post.category}
                        </span>
                        <span className="mx-3">•</span>
                        <span>{formatDate(post.date)}</span>
                        <span className="mx-3">•</span>
                        <span>{post.readTime} 分钟阅读</span>
                        <AuthContext.Consumer>
                          {({ isAuthenticated, isAdmin }) => (
                            isAuthenticated && isAdmin() && (
                              <div className="ml-auto flex space-x-2">
                                <Link 
                                  to={`/blog/upload/${post.id}`} 
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-2 py-1 rounded text-xs"
                                  title="编辑文章"
                                >
                                  <i className="fa-solid fa-edit"></i>
                                </Link>
                                <button 
                                  onClick={() => handleDelete(post.id)} 
                                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 px-2 py-1 rounded text-xs"
                                  title="删除文章"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            )
                          )}
                        </AuthContext.Consumer>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {post.title}
                        </Link>
                      </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    继续阅读 
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="mb-4 text-gray-400">
              <i className="fa-solid fa-book-open text-5xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">暂无文章</h3>
            <p className="text-gray-500 dark:text-gray-400">该分类下暂无文章，敬请期待。</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6"
            >
               <AuthContext.Consumer>
                {({ isAuthenticated, isAdmin }) => (
                  isAuthenticated && isAdmin() && (
                    <Link 
                      to="/blog/upload" 
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      <i className="fa-solid fa-plus mr-2"></i>
                      上传第一篇日记
                    </Link>
                  )
                )}
              </AuthContext.Consumer>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}