'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ChatMessage } from '../models/chat.model';

interface ChatContextProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addMessage: (message: ChatMessage) => void;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  setMessages: () => { },
  addMessage: () => { },
  inputText: '',
  setInputText: () => { },
  isLoading: false,
  setIsLoading: () => { },
  error: null,
  setError: () => { },
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wizy_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatMessage[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(parsed);
      } catch (e) {
        console.error('Error loading chat history', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wizy_chat_history', JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider 
      value={{ 
        messages, setMessages, addMessage,
        inputText, setInputText,
        isLoading, setIsLoading,
        error, setError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
