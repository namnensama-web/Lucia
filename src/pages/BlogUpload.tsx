import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { BlogPost } from '@/lib/mockData';
import { generateId } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

export default function BlogUpload() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  
  // 检查用户权限，如果不是管理员则重定向
  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error('您没有权限访问此页面，请使用管理员代码登录');
      navigate('/blog');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // 表单状态
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('生活日记');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 加载要编辑的文章数据
  useEffect(() => {
    if (id) {
      try {
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        const postToEdit = userPosts.find((post: BlogPost) => post.id === id);
        
        if (postToEdit) {
          setTitle(postToEdit.title);
          setExcerpt(postToEdit.excerpt);
          setContent(postToEdit.content);
          setCategory(postToEdit.category);
          setTags(postToEdit.tags);
          setCoverImage(postToEdit.coverImage);
        } else {
          toast.error('找不到要编辑的文章');
          navigate('/blog');
        }
      } catch (error) {
        console.error('加载文章失败:', error);
        toast.error('加载文章失败');
        navigate('/blog');
      }
    }
  }, [id, navigate]);
  
  // 如果不是管理员，不渲染页面内容
  if (!isAuthenticated || !isAdmin()) {
    return null;
  }
  
  // 分类选项
  const categories = ['生活日记', '旅行日记', '月度回顾', '城市摄影', '其他'];
  
  // 处理标签添加
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  // 处理标签删除
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // 估算阅读时间
  const calculateReadTime = (text: string): number => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!title.trim()) {
      toast.error('请输入日记标题');
      return;
    }
    
    if (!content.trim()) {
      toast.error('请输入日记内容');
      return;
    }
    
    if (!coverImage) {
      toast.error('请上传封面图片');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 获取现有文章
      const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
      
      if (id) {
        // 编辑模式 - 更新现有文章
        const updatedPosts = existingPosts.map((post: BlogPost) => 
          post.id === id 
            ? {
                ...post,
                title: title.trim(),
                excerpt: excerpt.trim() || content.trim().substring(0, 100) + '...',
                content: content.trim(),
                category,
                tags,
                coverImage,
                readTime: calculateReadTime(content)
              }
            : post
        );
        
        localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
        toast.success('日记更新成功！');
      } else {
        // 创建模式 - 添加新文章
        const newPost: BlogPost = {
          id: generateId(),
          title: title.trim(),
          excerpt: excerpt.trim() || content.trim().substring(0, 100) + '...',
          content: content.trim(),
          category,
          tags,
          date: new Date().toISOString().split('T')[0],
          coverImage,
          readTime: calculateReadTime(content)
        };
        
        // 添加新文章到开头
        const updatedPosts = [newPost, ...existingPosts];
        localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
        toast.success('日记上传成功！');
      }
      
      navigate('/blog');
    } catch (error) {
      toast.error('保存失败，请重试');
      console.error('保存失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 处理标签输入框按键事件
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{id ? '编辑日记' : '上传新日记'}</h1>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 space-y-6">
          {/* 标题输入 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              日记标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入日记标题"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={100}
            />
          </div>
          
          {/* 摘要输入 */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              日记摘要
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="请输入日记摘要（选填）"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              maxLength={200}
            />
          </div>
          
          {/* 分类选择 */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              日记分类
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          {/* 标签输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标签
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
                  >
                    <i className="fa-solid fa-times-circle"></i>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="输入标签后按回车添加"
                className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={20}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                添加
              </button>
            </div>
          </div>
          
          {/* 封面图片上传 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              封面图片 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer text-center">
                {coverImage ? (
                  <div className="relative">
                    <img 
                      src={coverImage} 
                      alt="预览" 
                      className="max-h-48 object-contain mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-1 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800"
                    >
                      <i className="fa-solid fa-times text-red-500"></i>
                    </button>
                  </div>
                ) : (
                  <div>
                    <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-2"></i>
                    <p className="text-gray-600 dark:text-gray-400">点击上传或拖拽图片到此处</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">支持 JPG, PNG, GIF 格式</p>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          {/* 日记内容 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              日记内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入日记内容..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
            />
            <div className="mt-2 text-right text-sm text-gray-500 dark:text-gray-400">
              {content.length} 字
            </div>
          </div>
          
          {/* 提交按钮 */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  上传中...
                </>
               ) : (
                id ? '更新日记' : '发布日记'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}