import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InboxSidebar from './components/InboxSidebar';
import ChatContainer from './components/chat/ChatContainer';
import AI from './components/Ai/AI';
import { type Conversation } from './utils/types';
import { Bot } from 'lucide-react';
import { mockConversations } from './utils/mockData';

const App: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [chatInput,setChatInput] = useState<string>('')
  const [aiChatInput,setAiChatInput] = useState<string>('')

// useEffect(() => {
//   const data = localStorage.getItem('conversations');
//   if (data) {
//     setConversations(JSON.parse(data));
//   } else {
//     setConversations(mockConversations);
//   }
// }, []);
// useEffect(() => {
//   localStorage.setItem('conversations', JSON.stringify(conversations));
// }
// , [conversations]);
  // Handle responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-close sidebars on mobile
      if (mobile) {
        setSidebarOpen(false);
        setInfoOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Check on initial load
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Toggle sidebar handler that ensures only one sidebar is open on mobile
  const toggleSidebar = () => {
    if (isMobile) {
    setSidebarOpen(!sidebarOpen);
    }
    if (isMobile && !sidebarOpen) {
      setInfoOpen(false);
    }
  };

  // Toggle info panel handler that ensures only one sidebar is open on mobile
  const toggleInfo = () => {
    setInfoOpen(!infoOpen);
    if (isMobile && !infoOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar with responsive behavior */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? (isMobile ? '100%' : 'auto') : '0px',
          opacity: sidebarOpen ? 1 : 0,
          zIndex: isMobile && sidebarOpen ? 30 : 10,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className={`absolute md:relative h-full border-r border-gray-200 dark:border-gray-700 overflow-hidden ${
          isMobile && sidebarOpen ? 'w-full' : ''
        }`}
        style={{ 
          minWidth: sidebarOpen ? (isMobile ? '100%' : '280px') : '0px', 
          maxWidth: sidebarOpen ? (isMobile ? '100%' : '380px') : '0px',
        }}
      >
        <InboxSidebar
          conversations={conversations}
          setConversations={setConversations}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </motion.aside>

      {/* Mobile sidebar toggle button */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-20 bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
          aria-label="Open inbox"
        >
          ☰
        </button>
      )}

      {/* Main Chat Section */}
      <motion.main
        className="flex-1 flex flex-col relative z-10 overflow-y-auto"
        initial={false}
        animate={{
          marginLeft: sidebarOpen && !isMobile ? '0px' : '0px',
          marginRight: infoOpen && !isMobile ? '0px' : '0px',
          opacity: (isMobile && (sidebarOpen || infoOpen)) ? 0.3 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <ChatContainer
          conversations={conversations}
          setConversations={setConversations}
          sidebarOpen={sidebarOpen}
          chatInput={chatInput}
          setChatInput={setChatInput}
          aiChatInput={aiChatInput}
          setAiChatInput={setAiChatInput}
        />
      </motion.main>

      <motion.aside
        initial={false}
        animate={{
          width: infoOpen ? (isMobile ? '100%' : 'auto') : '0px',
          opacity: infoOpen ? 1 : 0,
          zIndex: isMobile && infoOpen ? 30 : 10,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className={`absolute right-0 md:relative h-full border-l border-gray-200 dark:border-gray-700 overflow-visible ${
          isMobile && infoOpen ? 'w-full' : ''
        }`}
        style={{
          minWidth: infoOpen ? (isMobile ? '100%' : '360px') : '0px',
          maxWidth: infoOpen ? (isMobile ? '100%' : '460px') : '0px',
          display: infoOpen ? 'block' : 'none'
        }}
      >
        <AI
          setIsOpen={toggleInfo}
          isOpen={infoOpen}
          chatInput={chatInput}
          setChatInput={setChatInput}
          aiChatInput={aiChatInput}
          setAiChatInput={setAiChatInput}
        />
      </motion.aside>

      {/* Info panel toggle button, visible when chat is in focus */}
      <button
        onClick={toggleInfo}
        className={`absolute top-12 right-4 z-20 p-2 bg-blue-100 dark:bg-blue-900 rounded-full ${
          (isMobile && sidebarOpen) ? 'hidden' : 'block'
        }`}
        aria-label={infoOpen ? "Close info panel" : "Open info panel"}
      >
        {infoOpen ? "→" : <Bot size={20} className="text-blue-500 dark:text-blue-300" />}
      </button>
    </div>
  );
};

export default App;