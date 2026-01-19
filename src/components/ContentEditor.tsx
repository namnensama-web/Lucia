import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

interface ContentEditorProps {
  contentKey: string;
  defaultContent: string;
  placeholder: string;
  onSave: (content: string) => void;
}

export default function ContentEditor({ contentKey, defaultContent, placeholder, onSave }: ContentEditorProps) {
  const { isAdmin } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');

  // 加载存储的内容或默认内容
  useEffect(() => {
    const storedContent = localStorage.getItem(contentKey);
    if (storedContent) {
      setContent(storedContent);
      onSave(storedContent);
    } else {
      setContent(defaultContent);
    }
  }, [contentKey, defaultContent, onSave]);

  // 处理编辑
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 处理保存
  const handleSave = () => {
    try {
      localStorage.setItem(contentKey, content);
      onSave(content);
      toast.success('内容已保存');
      setIsEditing(false);
    } catch (error) {
      toast.error('保存失败，请重试');
      console.error('保存内容失败:', error);
    }
  };

  // 处理取消
  const handleCancel = () => {
    const storedContent = localStorage.getItem(contentKey);
    setContent(storedContent || defaultContent);
    setIsEditing(false);
  };

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="mt-2">
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleEdit}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center opacity-70 hover:opacity-100 transition-opacity"
          title="编辑内容"
        >
          <i className="fa-solid fa-edit mr-1"></i> 编辑
        </button>
      )}
    </div>
  );
}