import { NotebookPen } from 'lucide-react';
import { useState } from 'react';

interface Props{
    title:string;
    source:string;
    content:string;
    isVisible:boolean;
    onAddToComposer:(input:string)=>void
}

const ReferenceTooltip = ({ title, source, content, isVisible,onAddToComposer }:Props) => {
      const [isHovering,setIsHovering] = useState(false)

  if (!isVisible && !isHovering) return null;
  
  return (
    <div onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)} className="absolute bottom-5 left-12 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
          <p className="text-xs text-gray-500">{source}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>
        
        <button onClick={()=>onAddToComposer(content)} className="w-full bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <NotebookPen size={16} />
          Add to composer
        </button>
        
        {/* Arrow pointing down */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200 absolute top-0 left-0"></div>
        </div>
      </div>
    </div>
  );
};
export default ReferenceTooltip;