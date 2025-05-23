import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import type { Conversation } from '../utils/types';

interface Props {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const InboxSidebar = ({ conversations, setConversations, isOpen, toggleSidebar }: Props) => {
  
  const handleConversationClick = (conversation: Conversation) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversation.id
          ? { ...conv, selected: true, seen: true ,messages: conv.messages.map(msg => ({ ...msg, seen: true })) }
          : { ...conv, selected: false }
      )
    );
    toggleSidebar();
  };
  
  const getUnseenCount = (conversation: Conversation) => {
    return conversation.messages.filter(msg => !msg.seen).length;
  };
  
  const totalUnseenMessages = conversations.reduce(
    (total, conv) => total + getUnseenCount(conv), 
    0
  );

  return (
    <div className="relative h-full">
      
      <button 
        onClick={toggleSidebar}
        className="absolute -right-12 top-4 bg-blue-500 text-white p-2 rounded-r-md shadow-md hover:bg-blue-600 transition-colors z-10"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      
      {/* Sidebar Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-gray-900 h-full border-r border-gray-200 dark:border-gray-700 shadow-md w-full sm:w-80 md:w-96"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageSquare className="text-blue-500" />
                <h2 className="text-lg font-semibold">Your Inbox</h2>
              </div>
              
              {totalUnseenMessages > 0 && (
                <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                  <Bell size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    {totalUnseenMessages}
                  </span>
                </div>
              )}
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {conversations.map((conv) => (
                    <motion.li
                      key={conv.id}
                      onClick={() => handleConversationClick(conv)}
                      whileHover={{ 
                        backgroundColor: 'rgba(59, 130, 246, 0.2)' , 
                        scale: 1.01,
                        transition: { duration: 0.2 }
                      }}
                      className={`p-3 cursor-pointer flex items-start space-x-3 ${
                        conv.selected ? 'bg-blue-100  dark:bg-blue-900/30' : ''
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <img 
                          src={conv.avatar} 
                          alt={conv.name} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        />
                        {getUnseenCount(conv) > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {getUnseenCount(conv)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className={`font-medium truncate ${!conv.seen ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                            {conv.name}
                          </p>
                          {conv.timestamp && (
                            <p className="text-xs text-gray-500 flex-shrink-0">
                              {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          )}
                        </div>
                        
                        <p className={`text-sm truncate pr-2 ${
                          !conv.seen ? 'font-medium text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {conv.messages[conv.messages.length - 1]?.text || 'No messages'}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InboxSidebar;