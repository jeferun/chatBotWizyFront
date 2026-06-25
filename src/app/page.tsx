'use client';

import { Box } from '@mui/material';
import { ChatComponent } from '../views/Chat/ChatComponent';
import { useChatViewModel } from '../viewModels/useChatViewModel';

export default function Home() {
  const viewModel = useChatViewModel();

  return (
    <Box 
      component="main" 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 0, md: 4 }
      }}
    >
      <ChatComponent {...viewModel} />
    </Box>
  );
}
