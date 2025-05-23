import  { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Conversation } from '../../utils/types';


interface ChatBodyProps {
  messages: Conversation['messages'];
  currentUserAvatar: string;
  contactAvatar: string;
}

const ChatBody = ({ messages, currentUserAvatar, contactAvatar }: ChatBodyProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [key: string]: Conversation['messages'] } = {};
    
    messages.forEach(message => {
      const timestamp = message.timestamp 
        ? new Date(message.timestamp) 
        : new Date();
      
      const dateKey = timestamp.toLocaleDateString();
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      
      groups[dateKey].push(message);
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate();
  
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
      {Object.entries(messageGroups).map(([date, msgs]) => (
        <div key={date} className="mb-6">
          <div className="flex justify-center mb-4">
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
              {date === new Date().toLocaleDateString() ? 'Today' : date}
            </span>
          </div>
          
          {msgs.map((message, index) => {
            const isUser = message.from === 'You';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-end`}>
                  <img
                    src={isUser ? currentUserAvatar : contactAvatar}
                    alt={message.from}
                    className="w-8 h-8 rounded-full mx-2 flex-shrink-0"
                  />
                  
                  <div>
                    <div
                      className={`px-4 py-2 rounded-t-2xl ${
                        isUser 
                          ? 'bg-blue-500 text-white rounded-bl-2xl rounded-br-sm' 
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-br-2xl rounded-bl-sm border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {message.text}
                    </div>
                    
                    <div className={`flex items-center mt-1 text-xs text-gray-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{message.time}</span>
                      {isUser && (
                        <span className="ml-1 text-blue-700 dark:text-blue-300">
                          {message.seen ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBody;