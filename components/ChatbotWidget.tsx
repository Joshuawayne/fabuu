
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import CloseIcon from './icons/CloseIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon'; // Assuming you have this
import Spinner from './icons/Spinner'; // Assuming you have this

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const chatInstance = ai.chats.create({
          model: 'gemini-2.5-flash-preview-04-17',
          config: {
            systemInstruction: 'You are FABU Assistant, a friendly and stylish AI for a luxury fashion e-commerce brand. Be concise, helpful, and focus on fashion advice, product information, and brand details. Keep responses relatively short and engaging.',
          },
        });
        setChat(chatInstance);
        setMessages([{ role: 'model', text: 'Hello! I am FABU Assistant. How can I help you discover your next timeless piece today?' }]);
      } catch (error) {
        console.error("Error initializing Gemini AI:", error);
        setMessages([{ role: 'model', text: 'Sorry, I am currently unavailable. Please try again later.' }]);
      }
    } else {
        console.error("Gemini API Key not found.");
        setMessages([{ role: 'model', text: 'Chat service is not configured. API key missing.' }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0 && chat) { // Initial greeting if chat opens for the first time
      setMessages([{ role: 'model', text: 'Hello! I am FABU Assistant. How can I help you discover your next timeless piece today?' }]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

 // In ChatbotWidget.tsx, update the handleSendMessage function:

const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading || !chat) return;
  
    const userMessage: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
  
    try {
      const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage.text });
      const modelMessage: Message = { 
        role: 'model', 
        text: response.text || "I'm having trouble with my response. Please try again." 
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-luxury-accent text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 z-[120]"
          aria-label="Open chat"
        >
          <ChatBubbleIcon className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
            className="fixed bottom-0 right-0 mb-6 mr-0 sm:mr-6 w-full sm:max-w-sm h-[calc(100vh-3rem)] sm:h-[75vh] sm:max-h-[600px] bg-luxury-bg border border-luxury-subtle rounded-lg shadow-xl flex flex-col z-[130] animate-slideInRight"
            style={{animationDuration: '0.4s'}}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-luxury-subtle bg-luxury-bg/80 backdrop-blur-sm rounded-t-lg">
            <h3 id="chatbot-title" className="text-lg font-semibold text-luxury-text">FABU Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-luxury-text/70 hover:text-luxury-accent transition-colors"
              aria-label="Close chat"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 space-y-3 overflow-y-auto custom-scrollbar-chat">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-luxury-accent text-white rounded-br-none'
                      : 'bg-luxury-subtle text-luxury-text rounded-bl-none'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-luxury-subtle text-luxury-text rounded-bl-none">
                  <div className="flex items-center space-x-1">
                    <Spinner className="w-4 h-4 text-luxury-accent" />
                    <span className="text-sm">FABU is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-luxury-subtle bg-luxury-bg/80 backdrop-blur-sm rounded-b-lg">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask about style or products..."
                className="flex-grow p-3 bg-white border border-luxury-subtle rounded-lg focus:ring-1 focus:ring-luxury-accent focus:border-luxury-accent outline-none text-luxury-text text-sm placeholder:text-luxury-text/50"
                disabled={isLoading || !chat}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim() || !chat}
                className="p-3 bg-luxury-accent text-white rounded-lg hover:bg-opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:ring-offset-1 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3.105 3.105a1.5 1.5 0 012.122-.001L19.585 17.476a1.5 1.5 0 01-2.122 2.122L3.105 5.227a1.5 1.5 0 01-.001-2.122zM3.105 13.718L17.476 3.105a1.5 1.5 0 012.122 2.122L5.227 19.585a1.5 1.5 0 01-2.122-2.122z" clipRule="evenodd" transform="rotate(45 10 10) scale(0.8) translate(1.5,1.5)"/>
                     <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11a1 1 0 112 0v5.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />

                </svg>
              </button>
            </div>
          </form>
           <style>{`
            .custom-scrollbar-chat::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar-chat::-webkit-scrollbar-track {
                background: transparent;
            }
            .custom-scrollbar-chat::-webkit-scrollbar-thumb {
                background: #EAEAEA; /* luxury-subtle */
                border-radius: 10px;
            }
            .custom-scrollbar-chat::-webkit-scrollbar-thumb:hover {
                background: #d1d1d1; 
            }
            `}</style>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
