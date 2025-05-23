import React from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';
import { type Conversation } from '../../utils/types';
import { motion } from 'framer-motion';
import { myAvatar } from '../../utils/mockData';
import { useTextSelection } from '../text menu/UseTextSelection';
import SelectionMenu from '../text menu/SelectionMenu';

export const SidebarContext = React.createContext({ isOpen: true });

interface Props {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  sidebarOpen: boolean; 
  chatInput:string
  setChatInput:React.Dispatch<React.SetStateAction<string>>
  aiChatInput:string;
  setAiChatInput:React.Dispatch<React.SetStateAction<string>>;
}

const ChatContainer = ({ conversations, setConversations, sidebarOpen ,chatInput,setChatInput,aiChatInput,setAiChatInput}: Props) => {
  const selectedConversation = conversations.find((conv) => conv.selected);
  
    const selection = useTextSelection();
    const options = ['Summarize', 'Ask AI', 'Tune up', 'Remind']
    const onClicks = [()=>{},()=>{askAI()},()=>{},()=>{}]
    const askAI =()=>{
      setAiChatInput(aiChatInput+" "+selection?.text)
    }

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900 w-full">
        <div className="text-center p-8 max-w-md">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No conversation selected</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select a conversation from the sidebar or start a new one
          </p>
        </div>
      </div>
    );
  }

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      from: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      seen: true,
      timestamp: new Date().toISOString()
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.selected
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );
    
    setTimeout(() => {
      const replyMessage = {
        id: `msg-${Date.now()}`, 
        from: selectedConversation.name,
        text: `Thanks for your message: "${message}"`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        seen: true,
        timestamp: new Date().toISOString()
      };
      
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, messages: [...conv.messages, replyMessage] }
            : conv
        )
      );
    }, 500);
  };

  return (
    <motion.div 
      className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden"
      initial={false}
      animate={{ 
        marginLeft: sidebarOpen ? '0px' : '0px',
        width: '100%'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {selection && <SelectionMenu x={selection.x} y={selection.y} options={options} onOptionClicks={onClicks} />}

      <ChatHeader 
        name={selectedConversation.name} 
        avatar={selectedConversation.avatar} 
        status={selectedConversation.status || 'offline'}
      />
      
      <ChatBody 
        messages={selectedConversation.messages} 
        currentUserAvatar={myAvatar}
        contactAvatar={selectedConversation.avatar}
      />
      
      <ChatInput 
        onSendMessage={sendMessage} 
        conversationId={selectedConversation.id}
        placeholder={`Message ${selectedConversation.name}...`}
        chatInput={chatInput}
        setChatInput={setChatInput}
        aiChatInput={aiChatInput}
        setAiChatInput={setAiChatInput}
      />
    </motion.div>
  );
};

export default ChatContainer;