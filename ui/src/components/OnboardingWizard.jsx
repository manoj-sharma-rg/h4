import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, Button, Box, Typography, TextField, CircularProgress, Alert, Snackbar, Card, CardContent
} from '@mui/material';
import { Assignment, ListAlt, CheckCircle } from '@mui/icons-material';
import MappingEditor from './MappingEditor';

const steps = [
  { label: 'Enter PMS Code', icon: <Assignment color="primary" /> },
  { label: 'Review Mapping', icon: <ListAlt color="secondary" /> },
  { label: 'Test Translation', icon: <CheckCircle color="success" /> }
];

export default function OnboardingWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [pmsCode, setPmsCode] = useState('');
  const [mapping, setMapping] = useState(null);
  const [testMessage, setTestMessage] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);

  const handleNext = async () => {
    setError(null);
    setSuccess(null);
    setValidationErrors(null);
    if (activeStep === 0 && pmsCode) {
      setLoading(true);
      try {
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
        const res = await fetch(`/pms/${pmsCode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: testMessage,
        });
        const data = await res.json();
        if (!res.ok) {
          if (data && data.errors) {
            setValidationErrors(data.errors);
          } else {
            setError('Translation failed');
          }
        } else {
          setTranslationResult(data);
        }
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
    setSuccess(null);
    setValidationErrors(null);
    setActiveStep((prev) => prev - 1);
  };

  const handleMappingChange = (newMapping) => {
    setMapping(newMapping);
  };

  const handleMappingSave = async (newMapping) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/mapping/${pmsCode}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMapping),
      });
      if (!res.ok) throw new Error('Failed to save mapping');
      setSuccess('Mapping saved successfully!');
      setMapping(newMapping);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Card sx={{ minWidth: 700, borderRadius: 4, boxShadow: 6, background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)' }}>
        <CardContent>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ mb: 4, bgcolor: 'transparent' }}
            connector={null}
          >
            {steps.map((step, idx) => (
              <Step key={step.label}>
                <StepLabel icon={step.icon}>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Snackbar open autoHideDuration={3000} onClose={() => setSuccess(null)} message={success} />}
          {activeStep === 0 && (
            <Box>
              <TextField
                label="PMS Code"
                value={pmsCode}
                onChange={(e) => setPmsCode(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
            </Box>
          )}
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Mapping Editor</Typography>
              {loading ? <CircularProgress /> : (
                <MappingEditor
                  mapping={mapping}
                  onChange={handleMappingChange}
                  onSave={handleMappingSave}
                />
              )}
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Test Translation</Typography>
              <TextField
                label="Sample PMS Message (JSON)"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                fullWidth
                multiline
                minRows={4}
                sx={{ mb: 2 }}
              />
              <Button sx={{ mt: 2 }} variant="contained" onClick={handleNext} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Run Test'}
              </Button>
              {validationErrors && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <strong>Validation Errors:</strong>
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{typeof validationErrors === 'string' ? validationErrors : JSON.stringify(validationErrors, null, 2)}</pre>
                </Alert>
              )}
              {translationResult && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Result:</Typography>
                  <pre>{JSON.stringify(translationResult, null, 2)}</pre>
                </Box>
              )}
            </Box>
          )}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            {activeStep < steps.length - 1 && (
              <Button variant="contained" onClick={handleNext} disabled={activeStep === 0 && !pmsCode || loading}>
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 