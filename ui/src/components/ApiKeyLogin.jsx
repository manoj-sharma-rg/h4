import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';

export default function ApiKeyLogin() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('API key is required');
      return;
    }
    localStorage.setItem('apiKey', apiKey.trim());
    window.location.reload();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ minWidth: 400, borderRadius: 4, boxShadow: 6, p: 2 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#1976d2', fontWeight: 700 }}>
            Enter API Key
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please enter your API key to access the onboarding platform.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              autoFocus
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Save & Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 