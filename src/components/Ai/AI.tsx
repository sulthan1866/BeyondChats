import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Lightbulb, Bot,  ExternalLink, NotebookPen} from 'lucide-react';
import { aiResponses, mockAIConversation, mockSuggestions } from '../../utils/mockData';
import { type AIConversation} from '../../utils/types'
import ReferenceTooltip from './ReferenceToolTip';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatInput:string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  aiChatInput:string;
  setAiChatInput:React.Dispatch<React.SetStateAction<string>>;
}

const AI: React.FC<Props> = ({ isOpen ,setIsOpen,chatInput,setChatInput,aiChatInput,setAiChatInput}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [responses, setResponses] = useState<AIConversation[]>(mockAIConversation);
  const [hoveredRef, setHoveredRef] = useState<number|null>(null);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aiChatInput.trim()) return;
    
    const userQuery = aiChatInput;
    setResponses(prev => [...prev, { text: userQuery, type: 'user' }]);
    setAiChatInput('');
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setResponses(prev => [
        ...prev, 
        { 
          text: `Here's my response to "${userQuery}". This is where the AI assistant would provide helpful contextual information about the conversation.`, 
          type: 'ai' 
        }
      ]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string,index:number) => {
    setResponses(prev => [...prev, { text: suggestion, type: 'user' }]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setResponses(prev => [
        ...prev, 
        aiResponses[index]
      ]);
    }, 1500);
  };

  const onAddToComposer=(input:string)=>{
    setChatInput(chatInput+" "+input)
  }

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-gradient-to-bl bg-gray-50 dark:bg-gray-900 overflow-visible">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Bot size={20} className="text-blue-500 dark:text-blue-300" onClick={()=>setIsOpen(false)}/>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Analyzing your conversations</p>
          </div>
       
        </div>
      </div>
      
      {/* Chat area */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {responses.map((response, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${response.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[80%]">
              <div
                className={`p-4 rounded-2xl ${
                  response.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 border border-purple-200'
                }`}
              >
                <div className="whitespace-pre-line text-gray-800 mb-4">
                  {response.text}
                  {response.type === 'ai' && response.references && (
                    <div className="inline-flex ml-2">
                      {response.references.map((ref, _) => (
                        <div
                          key={ref.id}
                          className="relative inline-block"
                          onMouseEnter={() => setHoveredRef(ref.id)}
                          onMouseLeave={() => setHoveredRef(null)}
                        >
                          <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center cursor-pointer ml-1">
                            {ref.id}
                          </div>
                          
                            <ReferenceTooltip title={ref.title} content={ref.content} source={ref.source} isVisible={hoveredRef === ref.id } onAddToComposer={onAddToComposer} />
                          
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {response.type === 'ai' && (
                  <button onClick={()=>onAddToComposer(response.text)} className="w-full justify-center bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 border border-gray-200">
                    <NotebookPen size={16} />
                    Add to composer
                  </button>
                )}
              </div>
              
              {response.type === 'ai' && response.references && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm text-gray-600 font-medium">
                    {response.references.length} relevant sources found
                  </div>
                  {response.references.map((ref) => {
                    const IconComponent = ref.icon;
                    return (
                      <div
                        key={ref.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex-shrink-0">
                          <IconComponent size={16} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {ref.title}
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-gray-400" />
                      </div>
                    );
                  })}
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                    See all →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        </div>
        <div>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
  
      
      {/* Suggestions */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
          <Lightbulb size={14} className="mr-1" />
          Suggestions
        </h4>
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {mockSuggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(suggestion,i)}
              className="flex-shrink-0 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm py-1 px-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={aiChatInput}
            onChange={(e) => setAiChatInput(e.target.value)}
            placeholder="Ask about this conversation..."
            className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none dark:text-white"
          />
          <button
            type="submit"
            disabled={!aiChatInput.trim()}
            className={`ml-2 p-2 rounded-full ${
              aiChatInput.trim() 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            } transition-colors`}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AI;