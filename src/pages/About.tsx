import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/authContext';
import ContentEditor from '@/components/ContentEditor';

export default function About() {
  const { isAdmin } = useContext(AuthContext);
  const [blogPhilosophy, setBlogPhilosophy] = useState('');
  
  // 从localStorage加载数据，如果没有则使用默认值
  const getBloggerInfo = () => {
    const stored = localStorage.getItem('aboutBloggerInfo');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      name: '李明',
      bio: '热爱旅行、摄影和写作的自由创作者',
      avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Portrait%20of%20a%20blogger%20creative%20person%20smiling&sign=fbc7465516ef07bc22e11d8e902961a7'
    };
  };

  // 保存博主信息
  const saveBloggerInfo = (info: any) => {
    localStorage.setItem('aboutBloggerInfo', JSON.stringify(info));
  };

  // 获取默认的博客理念文本
  const getDefaultBlogPhilosophy = () => {
    return `我相信生活中的每一个瞬间都值得被记录和分享。这个博客是我记录生活、分享感悟的地方，希望通过文字和照片，能够与更多人分享生活中的美好和感动。

无论您是偶然路过，还是特意前来，都希望这里的内容能够给您带来一些启发或愉悦。如果您喜欢我的分享，欢迎常来做客，也欢迎与我交流。`;
  };

  // 获取博客统计数据
  const getBlogStats = () => {
    const stored = localStorage.getItem('aboutBlogStats');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      articles: 128,
      galleries: 36,
      views: '2.5K',
      years: 3
    };
  };

  // 保存博客统计数据
  const saveBlogStats = (stats: any) => {
    localStorage.setItem('aboutBlogStats', JSON.stringify(stats));
  };

  const bloggerInfo = getBloggerInfo();
  const blogStats = getBlogStats();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* 左侧内容 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">关于我</h1>
            {isAdmin() && (
              <button
                onClick={() => {
                  const newName = prompt('请输入博主姓名:', bloggerInfo.name);
                  const newBio = prompt('请输入博主简介:', bloggerInfo.bio);
                  if (newName !== null || newBio !== null) {
                    saveBloggerInfo({
                      ...bloggerInfo,
                      name: newName !== null ? newName : bloggerInfo.name,
                      bio: newBio !== null ? newBio : bloggerInfo.bio
                    });
                    // 重新渲染页面以更新信息
                    window.location.reload();
                  }
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
                title="编辑博主信息"
              >
                <i className="fa-solid fa-edit mr-1"></i> 编辑
              </button>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 relative">
                <img 
                  src={bloggerInfo.avatar} 
                  alt="博主照片" 
                  className="w-full h-full object-cover"
                />
                {isAdmin() && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <label 
                      htmlFor="avatarUpload" 
                      className="text-white text-center cursor-pointer"
                    >
                      <i className="fa-solid fa-camera text-xl"></i>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="avatarUpload"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            saveBloggerInfo({
                              ...bloggerInfo,
                              avatar: reader.result as string
                            });
                            window.location.reload();
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{bloggerInfo.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{bloggerInfo.bio}</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl" aria-label="微博">
                    <i className="fa-brands fa-weibo"></i>
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl" aria-label="微信">
                    <i className="fa-brands fa-weixin"></i>
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl" aria-label="Instagram">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl" aria-label="Email">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">博客理念</h2>
            </div>
            <div className="whitespace-pre-line text-gray-600 dark:text-gray-300">
              {blogPhilosophy || localStorage.getItem('aboutBlogPhilosophy') || getDefaultBlogPhilosophy()}
            </div>
            <ContentEditor
              contentKey="aboutBlogPhilosophy"
              defaultContent={getDefaultBlogPhilosophy()}
              placeholder="请输入博客理念..."
              onSave={setBlogPhilosophy}
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">博客统计</h2>
              {isAdmin() && (
                <button
                  onClick={() => {
                    const newArticles = prompt('博客文章数量:', blogStats.articles);
                    const newGalleries = prompt('照片专辑数量:', blogStats.galleries);
                    const newViews = prompt('总访问量:', blogStats.views);
                    const newYears = prompt('运营年限:', blogStats.years);
                    
                    if (newArticles !== null || newGalleries !== null || newViews !== null || newYears !== null) {
                      saveBlogStats({
                        articles: newArticles !== null ? parseInt(newArticles) || blogStats.articles : blogStats.articles,
                        galleries: newGalleries !== null ? parseInt(newGalleries) || blogStats.galleries : blogStats.galleries,
                        views: newViews !== null ? newViews : blogStats.views,
                        years: newYears !== null ? parseInt(newYears) || blogStats.years : blogStats.years
                      });
                      window.location.reload();
                    }
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
                  title="编辑统计数据"
                >
                  <i className="fa-solid fa-edit mr-1"></i> 编辑
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{blogStats.articles}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">博客文章</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{blogStats.galleries}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">照片专辑</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{blogStats.views}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">总访问量</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{blogStats.years}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">运营年限</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 右侧内容 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/2"
        >
          {/* 视觉呈现建议 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">视觉呈现建议</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-palette text-blue-600 dark:text-blue-400 mr-2"></i>
                  主题风格选择
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>简约优雅：以简洁的布局和优雅的排版为主，突出内容本身</li>
                  <li>自然温馨：使用柔和的色彩和有机的形状，营造温暖舒适的氛围</li>
                  <li>文艺清新：融入一些艺术元素和自然元素，展现博主的个性和品味</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-brush text-blue-600 dark:text-blue-400 mr-2"></i>
                  色彩搭配建议
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>主色调：柔和的蓝色或绿色，代表平静、思考和自然</li>
                  <li>辅助色：温暖的米色或淡橙色，用于强调和点缀</li>
                  <li>中性色：白色、浅灰和深灰，确保内容的可读性和整体的和谐</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-image text-blue-600 dark:text-blue-400 mr-2"></i>
                  照片排版方式
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>使用响应式网格布局，适应不同屏幕尺寸</li>
                  <li>相册封面采用统一比例，保持视觉一致性</li>
                  <li>照片添加适度的阴影和过渡效果，提升立体感</li>
                  <li>考虑使用瀑布流布局展示不同尺寸的照片</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-font text-blue-600 dark:text-blue-400 mr-2"></i>
                  字体选择
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>标题：使用稍微粗一点的无衬线字体，如Inter或Roboto</li>
                  <li>正文：使用清晰易读的无衬线字体，确保长文本阅读舒适</li>
                  <li>建立明确的字体层次结构，区分标题、副标题和正文</li>
                  <li>适当调整行高和字间距，提升阅读体验</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* 运营维护指南 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8">
            <h2 className="text-2xl font-bold mb-6">运营维护指南</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-calendar-alt text-blue-600 dark:text-blue-400 mr-2"></i>
                  内容发布频率建议
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>每周至少发布1-2篇文章，保持内容的更新频率</li>
                  <li>每月至少更新1个相册集，分享最近的照片</li>
                  <li>重要节日或特殊事件可以增加发布频率</li>
                  <li>制定内容计划表，确保内容的连贯性和多样性</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-comments text-blue-600 dark:text-blue-400 mr-2"></i>
                  互动管理方法
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>及时回复读者的评论和留言，建立良好的互动关系</li>
                  <li>定期举办一些互动活动，如问答、投票或征集主题</li>
                  <li>关注读者的反馈和建议，不断优化内容和体验</li>
                  <li>通过社交媒体与读者保持联系，扩大影响力</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-copyright text-blue-600 dark:text-blue-400 mr-2"></i>
                  照片版权注意事项
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>确保发布的照片拥有完整的版权或使用权</li>
                  <li>注明照片的拍摄时间和地点，增加内容的真实性</li>
                  <li>考虑添加水印或版权声明，保护自己的作品</li>
                  <li>尊重他人的知识产权，未经授权不使用他人的照片</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <i className="fa-solid fa-database text-blue-600 dark:text-blue-400 mr-2"></i>
                  数据备份策略
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>定期备份博客内容和照片，防止数据丢失</li>
                  <li>使用多个备份位置，如云端存储和本地硬盘</li>
                  <li>建立备份计划，如每周一次增量备份，每月一次完整备份</li>
                  <li>测试备份的完整性和可恢复性，确保在需要时能够快速恢复数据</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}