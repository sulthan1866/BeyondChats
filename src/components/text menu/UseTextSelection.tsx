import { useState, useEffect } from 'react';

export const useTextSelection = () => {
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selectedText = window.getSelection()?.toString();
      if (selectedText?.trim()) {
        const rect = window.getSelection()?.getRangeAt(0).getBoundingClientRect();
        if (rect) {
          setSelection({ text: selectedText, x: rect.left + window.scrollX, y: rect.top + window.scrollY });
        }
      } else {
        setSelection(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return selection;
};
