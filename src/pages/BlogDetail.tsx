import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts, BlogPost } from "@/lib/mockData";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

export default function BlogDetail() {
    const {
        id
    } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    let post: BlogPost | undefined;

    try {
        const userPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");
        post = userPosts.find((p: BlogPost) => p.id === id);

        if (!post) {
            post = blogPosts.find(p => p.id === id);
        }
    } catch (error) {
        console.error("加载文章失败:", error);
        post = blogPosts.find(p => p.id === id);
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: 0.5
                    }}>
                    <i
                        className="fa-solid fa-file-circle-exclamation text-6xl text-gray-400 mb-4"></i>
                    <h1 className="text-3xl font-bold mb-2">文章不存在</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">抱歉，您查找的文章不存在或已被删除。</p>
                    <a
                        href="/blog"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">返回文章列表
                                      </a>
                </motion.div>
            </div>
        );
    }

    const handleCopyLink = () => {
        const currentUrl = window.location.href;

        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.success("链接已复制到剪贴板");
        }).catch(() => {
            toast.error("复制失败，请手动复制");
        });
    };
    
    // 处理删除文章
    const handleDelete = () => {
        if (window.confirm("确定要删除这篇文章吗？此操作不可恢复。")) {
            try {
                const userPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");
                const filteredPosts = userPosts.filter((p: BlogPost) => p.id !== id);
                localStorage.setItem("userPosts", JSON.stringify(filteredPosts));
                toast.success("文章已删除");
                navigate("/blog");
            } catch (error) {
                toast.error("删除失败，请重试");
                console.error("删除文章失败:", error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <motion.article
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                {}
                <div className="p-6 md:p-8">
                     <div
                        className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <></>
                        <span className="mx-3">•</span>
                        <span>{formatDate(post.date)}</span>
                        <span className="mx-3">•</span>
                        <span>{post.readTime}分钟阅读</span>
                        {isAuthenticated && isAdmin() && (
                            <div className="ml-auto flex space-x-2">
                                <Link 
                                    to={`/blog/upload/${id}`} 
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-2 py-1 rounded"
                                >
                                    <i className="fa-solid fa-edit"></i> 编辑
                                </Link>
                                <button 
                                    onClick={handleDelete} 
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 px-2 py-1 rounded"
                                >
                                    <i className="fa-solid fa-trash"></i> 删除
                                </button>
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags.map(tag => <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                            {tag}
                        </span>)}
                    </div>
                    {}
                    <div className="mb-8">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                    {}
                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: post.content
                        }} />
                    {}
                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">分享本文</h3>
                        <div className="flex space-x-4">
                            <button
                                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                aria-label="分享到微博">
                                <i className="fa-brands fa-weibo text-red-500"></i>
                            </button>
                            <button
                                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                aria-label="分享到微信">
                                <i className="fa-brands fa-weixin text-green-500"></i>
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                aria-label="复制链接">
                                <i className="fa-solid fa-link text-blue-500"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.article>
            {}
            <div className="mt-8 text-center">
                <a
                    href="/blog"
                    className="inline-flex items-center px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <i className="fa-solid fa-arrow-left mr-2"></i>返回文章列表
                            </a>
            </div>
        </div>
    );
}