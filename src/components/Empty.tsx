import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Empty component
export function Empty() {
  return (
    <div 
      className={cn("flex h-full items-center justify-center py-12")} 
      onClick={() => toast('Coming soon')}
    >
      <div className="text-center">
        <div className="text-gray-400 mb-4">
          <i className="fa-solid fa-box-open text-4xl"></i>
        </div>
        <h3 className="text-lg font-semibold mb-1">暂无内容</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">点击查看更多</p>
      </div>
    </div>
  );
}