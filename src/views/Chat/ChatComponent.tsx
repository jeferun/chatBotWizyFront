'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Paper, OutlinedInput, IconButton, Typography, CircularProgress, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../../models/chat.model';

interface ChatComponentProps {
  messages: ChatMessage[];
  inputText: string;
  setInputText: (text: string) => void;
  isLoading: boolean;
  error: string | null;
  handleSend: () => void;
  clearHistory: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({
  messages,
  inputText,
  setInputText,
  isLoading,
  error,
  handleSend,
  clearHistory,
  onKeyPress
}) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje (Lógica puramente de UI/DOM)
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: { xs: '100vh', md: '80vh' },
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: { xs: 0, md: 4 }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          ChatBotWizy Assistant
        </Typography>
        <IconButton color="inherit" onClick={clearHistory} title="Clear Chat">
          <DeleteSweepIcon />
        </IconButton>
      </Box>

      {/* Messages Area */}
      <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'background.default' }}>
        {messages.length === 0 && (
          <Box sx={{ m: 'auto', textAlign: 'center', color: 'text.secondary' }}>
            <SmartToyIcon sx={{ fontSize: 60, opacity: 0.2, mb: 2 }} />
            <Typography variant="body1">¡Hola! ¿En qué puedo ayudarte hoy?</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>Pregúntame sobre productos o precios.</Typography>
          </Box>
        )}

        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
              gap: 1.5,
              alignItems: 'flex-start'
            }}
          >
            <Avatar sx={{ bgcolor: msg.sender === 'user' ? 'secondary.main' : 'primary.main', width: 32, height: 32 }}>
              {msg.sender === 'user' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
            </Avatar>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: '75%',
                bgcolor: msg.sender === 'user' ? '#e3f2fd' : 'white',
                borderRadius: 2,
                borderTopRightRadius: msg.sender === 'user' ? 0 : 8,
                borderTopLeftRadius: msg.sender === 'bot' ? 0 : 8,
              }}
            >
              <Box className="markdown-body" sx={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                '& p': { m: 0, '&:not(:last-child)': { mb: 1 } },
                '& a': { color: 'primary.main', fontWeight: 'bold' },
                '& img': { maxWidth: '200px', objectFit: 'contain', borderRadius: 1, mt: 1 },
                '& ol, & ul': { mt: 1, mb: 1, pl: 2.5 }
              }}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </Box>
            </Paper>
          </Box>
        ))}

        {isLoading && (
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              <SmartToyIcon fontSize="small" />
            </Avatar>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, borderTopLeftRadius: 0, display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} thickness={5} sx={{ color: 'text.secondary' }} />
            </Box>
          </Box>
        )}

        {error && (
          <Typography color="error" variant="caption" sx={{ alignSelf: 'center', mt: 1 }}>
            {error}
          </Typography>
        )}
        <div ref={endOfMessagesRef} />
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
        <OutlinedInput
          fullWidth
          multiline
          maxRows={4}
          placeholder="Escribe tu mensaje..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={onKeyPress}
          disabled={isLoading}
          endAdornment={
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              edge="end"
            >
              <SendIcon />
            </IconButton>
          }
          sx={{ borderRadius: 3, bgcolor: 'background.default' }}
        />
      </Box>
    </Paper>
  );
};
