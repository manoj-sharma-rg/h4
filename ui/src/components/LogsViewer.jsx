import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

export default function LogsViewer() {
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/logs');
        if (!res.ok) throw new Error('Failed to fetch logs');
        const text = await res.text();
        setLogs(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">System Logs</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ mt: 2, maxHeight: 300, overflow: 'auto', bgcolor: '#222', color: '#fff', p: 2, fontFamily: 'monospace', fontSize: 14 }}>
        {logs || 'No logs available.'}
      </Box>
    </Box>
  );
} 