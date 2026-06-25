'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { ChatProvider } from '../context/ChatContext';
import theme from '../common/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatProvider>
        {children}
      </ChatProvider>
    </ThemeProvider>
  );
}
