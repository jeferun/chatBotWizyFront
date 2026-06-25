'use client';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { sendChatMessage } from '../services/api.service';
import { ChatMessage } from '../models/chat.model';

export const useChatViewModel = () => {
  const { 
    messages, setMessages, addMessage,
    inputText, setInputText,
    isLoading, setIsLoading,
    error, setError
  } = useContext(ChatContext);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      const botResponse = await sendChatMessage(userMessage.content);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };
      addMessage(botMessage);
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    messages,
    inputText,
    setInputText,
    isLoading,
    error,
    handleSend,
    clearHistory,
    onKeyPress
  };
};
