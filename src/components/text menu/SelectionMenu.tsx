import React from 'react';

type Props = {
  x: number;
  y: number;
  options:string[]
  onOptionClicks: ((input?:string) => void)[];
};

const SelectionMenu: React.FC<Props> = ({ x, y, options,onOptionClicks }) => {
  return (
    <div
      className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md p-2 flex gap-2"
      style={{ top: y - 40, left: x }}
    >
      {options.map((label,i) => (
        <button
          key={label}
          className="text-sm px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          onClick={() => onOptionClicks[i]()}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SelectionMenu;
