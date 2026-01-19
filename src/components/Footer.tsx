import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const {
        isAdmin
    } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [contactText, setContactText] = useState("");

    const getContactText = () => {
        return localStorage.getItem("footerContactText") || "欢迎随时留言或发邮件与我交流！";
    };

    const saveContactText = (text: string) => {
        localStorage.setItem("footerContactText", text);
        setContactText(text);
        toast.success("联系文本已保存");
        setIsEditing(false);
    };

    if (!contactText) {
        setContactText(getContactText());
    }

    return (
        <footer
            className="bg-gray-100 dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <></>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">快速链接</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li>
                                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">首页</Link>
                            </li>
                            <li>
                                <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">日记</Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="hover:text-blue-600 dark:hover:text-blue-400">相册</Link>
                            </li>
                            <li>
                                <Link to="/gallery" className="hover:text-blue-600 dark:hover:text-blue-400">相册</Link>
                            </li>
                        </ul>
                    </div>
                    <></>
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">联系我</h3>
                            {isAdmin() && <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
                                title="编辑联系文本">
                                <i className="fa-solid fa-edit mr-1"></i> {isEditing ? "取消" : "编辑"}
                            </button>}
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <></>
                            <a
                                href="#"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                                aria-label="微信">
                                <i className="fa-brands fa-weixin"></i>
                            </a>
                            <></>
                            <a
                                href="#"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                                aria-label="QQ">
                                <i className="fa-brands fa-qq"></i>
                            </a>
                            <></>
                            <a
                                href="#"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                                aria-label="Email">
                                <i className="fa-solid fa-envelope"></i>
                            </a>
                        </div>
                        {isEditing ? <div className="space-y-2">
                            <textarea
                                value={contactText}
                                onChange={e => setContactText(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={2} />
                            <button
                                onClick={() => saveContactText(contactText)}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">保存
                                                                </button>
                        </div> : <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {contactText}
                        </p>}
                    </div>
                </div>
                <div
                    className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 text-sm">
                    {isAdmin() ? <div className="flex justify-center items-center">
                        <p>© {currentYear}{localStorage.getItem("footerCopyright") || "我的个人博客"}. 保留所有权利.</p>
                        <button
                            onClick={() => {
                                const newText = prompt("请输入版权信息:", localStorage.getItem("footerCopyright") || "我的个人博客");

                                if (newText !== null) {
                                    localStorage.setItem("footerCopyright", newText);
                                    window.location.reload();
                                }
                            }}
                            className="ml-2 text-blue-600 dark:text-blue-400 hover:underline flex items-center text-xs"
                            title="编辑版权信息">
                            <i className="fa-solid fa-edit"></i>
                        </button>
                    </div> : <p>© {currentYear}{localStorage.getItem("footerCopyright") || "我的个人博客"}. 保留所有权利.</p>}
                </div>
            </div>
        </footer>
    );
}