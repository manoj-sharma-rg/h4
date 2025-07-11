import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* Placeholder SVG logo */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#1976d2" />
            <text x="20" y="26" textAnchor="middle" fontSize="18" fill="#fff" fontFamily="Arial">RG</text>
          </svg>
          <Typography variant="h5" sx={{ ml: 2, fontWeight: 700, color: '#1976d2' }}>
            RGBridge PMS Onboarding
          </Typography>
        </Box>
        <Typography variant="subtitle2" sx={{ color: '#888' }}>
          Seamless PMS Integration
        </Typography>
      </Toolbar>
    </AppBar>
  );
} 