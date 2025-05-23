import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  name: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const ChatHeader = ({ name, avatar, status = 'offline' }: ChatHeaderProps) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center space-x-3">
        <button className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <ArrowLeft size={20} />
        </button>
        
        <div className="relative">
          <img 
            src={avatar} 
            alt={name} 
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
          <span 
            className={`absolute bottom-0 right-0 w-3 h-3 ${statusColors[status]} border-2 border-white dark:border-gray-800 rounded-full`}
          />
        </div>
        
        <div>
          <h2 className="font-medium text-gray-900 dark:text-gray-100">{name}</h2>
          <p className="text-xs text-gray-500 capitalize">{status}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
          <Phone size={18} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
          <Video size={18} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;