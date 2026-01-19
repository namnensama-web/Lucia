import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { blogPosts, photoGalleries } from "@/lib/mockData";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/authContext";
import ContentEditor from "@/components/ContentEditor";
import MessageForm from "@/components/MessageForm";
import MessageList from "@/components/MessageList";

interface Message {
  id: string;
  name: string;
  content: string;
  time: string;
}

export default function Home() {
    const {
        theme,
        toggleTheme
    } = useTheme();
    const { isAdmin } = useContext(AuthContext);
    const [subtitle, setSubtitle] = useState('这里存放我对生活的一点看法，以及一些日常');
    const [messages, setMessages] = useState<Message[]>([]);

    const latestPosts = blogPosts.slice(0, 3);
    const featuredGalleries = photoGalleries.slice(0, 3);
    
    // 从localStorage加载留言数据
    useEffect(() => {
      const storedMessages = localStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    }, []);
    
    // 保存留言到localStorage
    const saveMessage = (newMessage: Message) => {
      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
    };

    // 标题可以从localStorage加载，默认"Welcome"
    const getTitle = () => {
        return localStorage.getItem('homeTitle') || 'Welcome';
    };

    // 保存标题
    const saveTitle = (newTitle: string) => {
        localStorage.setItem('homeTitle', newTitle);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <motion.section
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.6
                }}
                className="mb-16 text-center">
                <div className="relative inline-block">
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                        style={{
                            fontSize: "72px",
                            fontFamily: "\"Noto Serif SC\", serif",
                            textDecorationThickness: "0px",
                            fontSynthesisStyle: "auto"
                         }}>
                        {getTitle()}
                    </h1>
                    {isAdmin() && (
                        <button
                            onClick={() => {
                                const newTitle = prompt('请输入新的标题:', getTitle());
                                if (newTitle !== null) {
                                    saveTitle(newTitle);
                                    // 重新渲染页面以更新标题
                                    window.location.reload();
                                }
                            }}
                            className="absolute -top-4 -right-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 opacity-70 hover:opacity-100 transition-opacity"
                            title="编辑标题"
                        >
                            <i className="fa-solid fa-edit"></i>
                        </button>
                    )}
                </div>
                <div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                    <ContentEditor
                        contentKey="homeSubtitle"
                        defaultContent="这里存放我对生活的一点看法，以及一些日常"
                        placeholder="请输入副标题内容..."
                        onSave={setSubtitle}
                    />
                </div>
            </motion.section>

            <motion.section
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.4
                }}
                className="mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">日记</h2>
                    <Link
                        to="/blog"
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">查看全部 <i className="fa-solid fa-arrow-right ml-2"></i>
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map(post => <motion.div
                        key={post.id}
                        whileHover={{
                            y: -5
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300
                        }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <div
                                className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <span>{post.category}</span>
                                <span className="mx-2">•</span>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                            <Link
                                to={`/blog/${post.id}`}
                                className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline">阅读更多
                            </Link>
                        </div>
                    </motion.div>)}
                </div>
            </motion.section>

            <motion.section
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.6
                }}>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">相册</h2>
                    <Link
                        to="/gallery"
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">查看全部 <i className="fa-solid fa-arrow-right ml-2"></i>
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredGalleries.map(gallery => <motion.div
                        key={gallery.id}
                        whileHover={{
                            y: -5
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300
                        }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                        <div className="relative">
                            <img
                                src={gallery.coverImage}
                                alt={gallery.title}
                                className="w-full h-56 object-cover" />
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <p className="text-white font-semibold">{gallery.photoCount}张照片</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{gallery.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{gallery.date}</p>
                        </div>
                    </motion.div>)}
                </div>
             </motion.section>
             
             {/* 留言板区域 */}
             <motion.section
                 initial={{
                     opacity: 0,
                     y: 20
                 }}
                 animate={{
                     opacity: 1,
                     y: 0
                 }}
                 transition={{
                     duration: 0.6,
                     delay: 0.8
                 }}
                 className="mt-16"
             >
                 <h2 className="text-3xl font-bold mb-8">留言板</h2>
                 <MessageForm onSubmit={saveMessage} />
                 <MessageList messages={messages} />
             </motion.section>
        </div>
    );
}