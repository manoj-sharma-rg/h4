import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper } from '@mui/material';

export default function MappingEditor({ mapping, onChange, onSave }) {
  const [editMapping, setEditMapping] = useState({});

  useEffect(() => {
    setEditMapping(mapping || {});
  }, [mapping]);

  const handleFieldChange = (pmsField, value) => {
    setEditMapping((prev) => ({ ...prev, [pmsField]: value }));
    if (onChange) onChange({ ...editMapping, [pmsField]: value });
  };

  const handleSave = () => {
    if (onSave) onSave(editMapping);
  };

  if (!editMapping || Object.keys(editMapping).length === 0) {
    return <div>No mapping data.</div>;
  }

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>PMS Field</TableCell>
            <TableCell>RGBridge Field</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(editMapping).map(([pmsField, rgbridgeField]) => (
            <TableRow key={pmsField}>
              <TableCell>{pmsField}</TableCell>
              <TableCell>
                <TextField
                  value={typeof rgbridgeField === 'string' ? rgbridgeField : JSON.stringify(rgbridgeField)}
                  onChange={(e) => handleFieldChange(pmsField, e.target.value)}
                  size="small"
                  fullWidth
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" sx={{ m: 2 }} onClick={handleSave}>
        Save Mapping
      </Button>
    </TableContainer>
  );
} 