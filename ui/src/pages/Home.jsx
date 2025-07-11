import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 400, borderRadius: 4, boxShadow: 6, p: 2 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#1976d2" />
            <text x="20" y="26" textAnchor="middle" fontSize="18" fill="#fff" fontFamily="Arial">RG</text>
          </svg>
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 700, color: '#1976d2' }}>
            Welcome to RGBridge PMS Onboarding
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
            Easily integrate your PMS with RGBridge using our step-by-step wizard.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/onboard')}>
            Start Onboarding
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
} 