import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { PhotoGallery } from '@/lib/mockData';
import { generateId } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

export default function GalleryUpload() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  
  // 检查用户权限，如果不是管理员则重定向
  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error('您没有权限访问此页面，请使用管理员代码登录');
      navigate('/gallery');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // 表单状态
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('旅行相册');
  const [coverImage, setCoverImage] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 初始化日期为当前日期
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setDate(`${year}年${month}月${day}日`);
  }, []);
  
  // 如果不是管理员，不渲染页面内容
  if (!isAuthenticated || !isAdmin()) {
    return null;
  }
  
  // 分类选项
  const categories = ['旅行相册', '城市摄影', '生活记录', '风景摄影', '其他'];
  
  // 处理封面图片上传
  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // 处理照片上传
  const handlePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      let processed = 0;
      
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          processed++;
          
          if (processed === files.length) {
            setPhotos([...photos, ...newPhotos]);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };
  
  // 处理删除照片
  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!title.trim()) {
      toast.error('请输入相册标题');
      return;
    }
    
    if (!description.trim()) {
      toast.error('请输入相册描述');
      return;
    }
    
    if (!coverImage) {
      toast.error('请上传封面图片');
      return;
    }
    
    if (photos.length === 0) {
      toast.error('请至少上传一张照片');
      return;
    }
    
    setIsSubmitting(true);
    
    // 创建新的相册
    const newGallery: PhotoGallery = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      date,
      category,
      coverImage,
      photoCount: photos.length,
      photos
    };
    
    // 保存到localStorage
    try {
      // 获取现有相册
      const existingGalleries = JSON.parse(localStorage.getItem('userGalleries') || '[]');
      // 添加新相册
      const updatedGalleries = [newGallery, ...existingGalleries];
      // 保存回localStorage
      localStorage.setItem('userGalleries', JSON.stringify(updatedGalleries));
      
      toast.success('相册上传成功！');
      navigate('/gallery');
    } catch (error) {
      toast.error('保存失败，请重试');
      console.error('保存失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">上传新相册</h1>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 space-y-6">
          {/* 标题输入 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              相册标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入相册标题"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={100}
            />
          </div>
          
          {/* 描述输入 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              相册描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入相册描述"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              maxLength={200}
            />
          </div>
          
          {/* 日期输入 */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              日期
            </label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="例如：2026年1月"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* 分类选择 */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              相册分类
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
          
          {/* 封面图片上传 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              封面图片 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                className="hidden"
                id="coverImageUpload"
              />
              <label htmlFor="coverImageUpload" className="cursor-pointer text-center">
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
          
          {/* 照片上传 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              相册照片 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosUpload}
                className="hidden"
                id="photosUpload"
              />
              <label htmlFor="photosUpload" className="cursor-pointer text-center">
                <div>
                  <i className="fa-solid fa-images text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-600 dark:text-gray-400">点击上传或拖拽多张图片到此处</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">支持 JPG, PNG, GIF 格式，可上传多张</p>
                </div>
              </label>
            </div>
            
            {/* 已上传照片预览 */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={photo} 
                      alt={`照片 ${index + 1}`} 
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-white/80 dark:bg-gray-800/80 p-1 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800"
                    >
                      <i className="fa-solid fa-times text-red-500 text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {photos.length > 0 && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                已上传 {photos.length} 张照片
              </p>
            )}
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
                '发布相册'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}