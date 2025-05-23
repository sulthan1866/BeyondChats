import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (chatInput: string) => void;
  conversationId: string;
  placeholder?: string;
  chatInput:string;
  setChatInput:React.Dispatch<React.SetStateAction<string>>;
  aiChatInput:string;
  setAiChatInput:React.Dispatch<React.SetStateAction<string>>;
}

const ChatInput = ({ onSendMessage, conversationId, placeholder = 'Type a chatInput...',chatInput,setChatInput}: ChatInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setChatInput('');
  }, [conversationId]);
  

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '0px';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = scrollHeight + 'px';
    }
  }, [chatInput]);
  
  const handleSend = () => {
    if (chatInput.trim()) {
      onSendMessage(chatInput.trim());
      setChatInput('');
      
      // Focus back on the input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, you would start/stop audio recording here
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="flex items-end bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
          <Paperclip size={20} />
        </button>
        
        <textarea
          ref={inputRef}
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow mx-2 bg-transparent border-none focus:ring-0 focus:outline-none resize-none max-h-32 py-2 dark:text-white"
          rows={1}
        />
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
            <Smile size={20} />
          </button>
          
          {chatInput.trim() ? (
            <button 
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors"
            >
              <Send size={18} />
            </button>
          ) : (
            <button 
              onClick={toggleRecording}
              className={`${
                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              } text-white rounded-full p-2 transition-colors`}
            >
              <Mic size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;