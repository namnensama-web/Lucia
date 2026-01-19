import { useState, useEffect } from 'react';

interface Message {
  id: string;
  name: string;
  content: string;
  time: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">留言列表</h3>
      
      {messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          <i className="fa-solid fa-comment-slash text-4xl mb-3"></i>
          <p>暂无留言</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-blue-600 dark:text-blue-400">{message.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{message.time}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{message.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}