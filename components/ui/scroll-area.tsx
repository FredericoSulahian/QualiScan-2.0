import * as React from 'react';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// Minimal ScrollArea wrapper used by components to provide a scrollable area
export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`overflow-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
