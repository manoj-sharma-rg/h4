import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography, TextField, CircularProgress, Alert } from '@mui/material';

const steps = ['Enter PMS Code', 'Review Mapping', 'Test Translation'];

export default function OnboardingWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [pmsCode, setPmsCode] = useState('');
  const [mapping, setMapping] = useState(null);
  const [testMessage, setTestMessage] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = async () => {
    setError(null);
    if (activeStep === 0 && pmsCode) {
      setLoading(true);
      try {
        // Fetch mapping from backend (assume GET /mapping/{pmsCode})
        const res = await fetch(`/mapping/${pmsCode}`);
        if (!res.ok) throw new Error('Mapping not found');
        const data = await res.json();
        setMapping(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (activeStep === 2 && testMessage) {
      setLoading(true);
      try {
        // Call backend /pms/{pmsCode} with testMessage
        const res = await fetch(`/pms/${pmsCode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: testMessage,
        });
        if (!res.ok) throw new Error('Translation failed');
        const data = await res.json();
        setTranslationResult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {activeStep === 0 && (
          <Box>
            <TextField
              label="PMS Code"
              value={pmsCode}
              onChange={(e) => setPmsCode(e.target.value)}
              fullWidth
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6">Mapping Editor (placeholder)</Typography>
            {loading ? <CircularProgress /> : <pre>{JSON.stringify(mapping, null, 2)}</pre>}
            {/* TODO: Add editable mapping table/form */}
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6">Test Translation</Typography>
            <TextField
              label="Sample PMS Message (JSON)"
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              fullWidth
              multiline
              minRows={4}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleNext} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Run Test'}
            </Button>
            {translationResult && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Result:</Typography>
                <pre>{JSON.stringify(translationResult, null, 2)}</pre>
              </Box>
            )}
          </Box>
        )}
        <Box sx={{ mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext} disabled={activeStep === 0 && !pmsCode || loading}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
} 