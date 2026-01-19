import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { photoGalleries, PhotoGallery } from "@/lib/mockData";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import ContentEditor from "@/components/ContentEditor";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

export default function Gallery() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>("全部");

    const {
        isAdmin
    } = useContext(AuthContext);

    const [pageDescription, setPageDescription] = useState("");

    const getUserGalleries = () => {
        const stored = localStorage.getItem("userGalleries");

        if (stored) {
            return JSON.parse(stored);
        }

        return photoGalleries;
    };

    const [galleries, setGalleries] = useState(getUserGalleries());
    
    // 处理上传相册
    const handleUploadGallery = () => {
        navigate("/gallery/upload");
    };

    const saveGalleries = (newGalleries: any[]) => {
        localStorage.setItem("userGalleries", JSON.stringify(newGalleries));
        setGalleries(newGalleries);
    };

    const categories = ["全部", ...Array.from(new Set(galleries.map(gallery => gallery.category)))];
    const filteredGalleries = selectedCategory === "全部" ? galleries : galleries.filter(gallery => gallery.category === selectedCategory);

    const getDefaultPageDescription = () => {
        return "用照片记录生活中的美好瞬间，留住每一个值得回忆的时刻";
    };

    const handleDeleteGallery = (galleryId: string) => {
        if (window.confirm("确定要删除这个相册吗？")) {
            const updatedGalleries = galleries.filter(g => g.id !== galleryId);
            saveGalleries(updatedGalleries);
        }
    };

    const handleEditGallery = (galleryId: string) => {
        const gallery = galleries.find(g => g.id === galleryId);

        if (gallery) {
            const newTitle = prompt("请输入相册标题:", gallery.title);
            const newDescription = prompt("请输入相册描述:", gallery.description);
            const newDate = prompt("请输入日期:", gallery.date);

            if (newTitle !== null || newDescription !== null || newDate !== null) {
                const updatedGalleries = galleries.map(g => {
                    if (g.id === galleryId) {
                        return {
                            ...g,
                            title: newTitle !== null ? newTitle : g.title,
                            description: newDescription !== null ? newDescription : g.description,
                            date: newDate !== null ? newDate : g.date
                        };
                    }

                    return g;
                });

                saveGalleries(updatedGalleries);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-12 text-center">
                 <div className="flex justify-center items-center mb-4">
                     <motion.h1
                         initial={{
                             opacity: 0,
                             y: -20
                         }}
                         animate={{
                             opacity: 1,
                             y: 0
                         }}
                         transition={{
                             duration: 0.5
                         }}
                         className="text-4xl font-bold">我的相册
                                   </motion.h1>
                     {isAdmin() && <button
                         onClick={() => {
                             const newTitle = prompt("请输入页面标题:", "我的相册");

                             if (newTitle !== null) {
                                 localStorage.setItem("galleryPageTitle", newTitle);
                                 window.location.reload();
                             }
                         }}
                         className="ml-2 text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
                         title="编辑页面标题">
                         <i className="fa-solid fa-edit"></i>
                     </button>}
                 </div>
                 <div className="mt-6">
                     {isAdmin() && (
                         <motion.button
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 0.5, delay: 0.4 }}
                             onClick={handleUploadGallery}
                             className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mx-auto"
                         >
                             <i className="fa-solid fa-plus mr-2"></i>
                             上传新相册
                         </motion.button>
                     )}
                </div>
                <div>
                    <motion.p
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2
                        }}
                        className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        {pageDescription || localStorage.getItem("galleryPageDescription") || getDefaultPageDescription()}
                    </motion.p>
                    <ContentEditor
                        contentKey="galleryPageDescription"
                        defaultContent={getDefaultPageDescription()}
                        placeholder="请输入页面描述..."
                        onSave={setPageDescription} />
                </div>
            </div>
            {}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.3
                }}
                className="mb-10 overflow-x-auto">
                <div className="flex space-x-2 pb-2 min-w-max">
                    {categories.map(category => <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                        {category}
                    </button>)}
                </div>
            </motion.div>
            {}
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 0.5,
                    delay: 0.4
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGalleries.length > 0 ? filteredGalleries.map(gallery => <motion.div
                    key={gallery.id}
                    whileHover={{
                        y: -5
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300
                    }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative">
                    <div className="relative group">
                        <img
                            src={gallery.coverImage}
                            alt={gallery.title}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex items-end">
                            <div className="p-6">
                                <p className="text-white font-semibold text-sm">
                                    <i className="fa-solid fa-images mr-1"></i> {gallery.photoCount}张照片
                                                        </p>
                            </div>
                        </div>
                        {isAdmin() && <div className="absolute top-2 right-2 flex space-x-1">
                            <button
                                onClick={() => handleEditGallery(gallery.id)}
                                className="p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400"
                                title="编辑相册">
                                <i className="fa-solid fa-edit text-xs"></i>
                            </button>
                            <button
                                onClick={() => handleDeleteGallery(gallery.id)}
                                className="p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 text-red-500"
                                title="删除相册">
                                <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                        </div>}
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{gallery.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{gallery.description}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                {gallery.category}
                            </span>
                            <span className="mx-3">•</span>
                            <span>{gallery.date}</span>
                        </div>
                    </div>
                 </motion.div>) : <div className="col-span-full text-center py-20">
                    <div className="mb-4 text-gray-400">
                        <i className="fa-solid fa-images text-5xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">暂无相册</h3>
                    <p className="text-gray-500 dark:text-gray-400">该分类下暂无相册，敬请期待。</p>
                    {isAdmin() && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-6"
                        >
                            <button
                                onClick={handleUploadGallery}
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                            >
                                <i className="fa-solid fa-plus mr-2"></i>
                                上传第一个相册
                            </button>
                        </motion.div>
                    )}
                </div>}
            </motion.div>
        </div>
    );
}