import { useState } from 'react';
import { toast } from 'sonner';

interface MessageFormProps {
  onSubmit: (message: {
    id: string;
    name: string;
    content: string;
    time: string;
  }) => void;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证留言内容
    if (!content.trim()) {
      toast.error('请输入留言内容');
      return;
    }
    
    // 创建新留言
    const newMessage = {
      id: Date.now().toString(),
      name: name.trim() || '匿名用户',
      content: content.trim(),
      time: new Date().toLocaleString('zh-CN')
    };
    
    // 调用父组件的提交函数
    onSubmit(newMessage);
    
    // 清空表单
    setName('');
    setContent('');
    
    // 显示成功提示
    toast.success('留言成功');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-bold mb-4">发表留言</h3>
      
      <div className="mb-4">
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          昵称（选填）
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请输入您的昵称"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={20}
        />
      </div>
      
      <div className="mb-6">
        <label 
          htmlFor="content" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          留言内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="请输入您的留言..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          maxLength={200}
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          还可以输入 {200 - content.length} 字
        </p>
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        提交留言
      </button>
    </form>
  );
}