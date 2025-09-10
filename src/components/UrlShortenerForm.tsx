import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addUrl, getUrls } from "../utils/storage";
import type { UrlRecord } from "../types";
const generateShortCode = () => Math.random().toString(36).substring(2, 8);

interface UrlInput {
  originalUrl: string;
  validity: string;
  customCode: string;
}

export default function UrlShortenerForm() {
  const [inputs, setInputs] = useState<UrlInput[]>([
    { originalUrl: "", validity: "", customCode: "" },
  ]);

  const handleChange = (index: number, field: keyof UrlInput, value: string) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
    Log("frontend", "debug", "component", `Input updated at index ${index}, field: ${field}`);
  };

  const addInputField = () => {
    if (inputs.length >= 5) return;
    setInputs([...inputs, { originalUrl: "", validity: "", customCode: "" }]);
    Log("frontend", "info", "component", "Added a new URL input field");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    inputs.forEach((input) => {
      if (!input.originalUrl) return;

      if (!/^https?:\/\//i.test(input.originalUrl)) {
        Log("frontend", "error", "component", `Invalid URL: ${input.originalUrl}`);
        alert(`Invalid URL: ${input.originalUrl}`);
        return;
      }

      const validityMinutes = input.validity ? parseInt(input.validity, 10) : 30;
      if (isNaN(validityMinutes) || validityMinutes <= 0) {
        Log("frontend", "error", "component", `Invalid validity: ${input.validity}`);
        alert("Validity must be a positive integer (minutes).");
        return;
      }

      let shortCode = input.customCode || generateShortCode();
      const urls = getUrls();
      if (urls.find((u) => u.shortCode === shortCode)) {
        Log("frontend", "warn", "component", `Shortcode collision: ${shortCode}`);
        alert(`Shortcode ${shortCode} is already taken!`);
        return;
      }

      const newRecord: UrlRecord = {
        id: uuidv4(),
        originalUrl: input.originalUrl,
        shortCode,
        createdAt: new Date().toISOString(),
        expiry: new Date(Date.now() + validityMinutes * 60 * 1000).toISOString(),
        clicks: [],
      };

      addUrl(newRecord);
      Log("frontend", "info", "component", `URL shortened: ${input.originalUrl} -> ${shortCode}`);
      alert(`Shortened URL created: http://localhost:3000/${shortCode}`);
    });

    setInputs([{ originalUrl: "", validity: "", customCode: "" }]);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Shorten Your URLs
      </Typography>
      <Typography variant="body2" gutterBottom>
        Default validity: 30 minutes.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <TextField
              label="Original URL"
              variant="outlined"
              fullWidth
              value={input.originalUrl}
              onChange={(e) => handleChange(index, "originalUrl", e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              label="Validity (min)"
              type="number"
              variant="outlined"
              fullWidth
              value={input.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              label="Custom Shortcode (optional)"
              variant="outlined"
              fullWidth
              value={input.customCode}
              onChange={(e) => handleChange(index, "customCode", e.target.value)}
            />
          </Box>
        ))}

        {inputs.length < 5 && (
          <Button type="button" variant="outlined" onClick={addInputField} sx={{ mb: 2 }}>
            Add another URL
          </Button>
        )}

        <Button type="submit" variant="contained" fullWidth>
          Shorten URLs
        </Button>
      </Box>
    </Paper>
  );
}
