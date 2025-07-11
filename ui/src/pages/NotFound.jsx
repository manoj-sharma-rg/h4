import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 400, borderRadius: 4, boxShadow: 6, p: 2 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#ff4081', fontWeight: 700 }}>
            404
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Page Not Found
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>Go Home</Button>
        </CardContent>
      </Card>
    </Box>
  );
} 