
import React from 'react';

interface ChatBubbleIconProps {
  className?: string;
}

const ChatBubbleIcon: React.FC<ChatBubbleIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.696-3.696A4.954 4.954 0 0112 15.25H4.512c-1.136 0-2.062-.967-2.062-2.103V8.511c0-1.136.926-2.062 2.062-2.062h12.426c.499 0 .979.124 1.382.356zM20.25 8.511L15 11.25M4.512 8.511L9 11.25m0 0V5.25m0 6l-4.488-2.739" 
      />
    </svg>
  );
};

export default ChatBubbleIcon;
