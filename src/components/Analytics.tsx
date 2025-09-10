import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import type { UrlRecord } from "../types";
import { getUrls } from "../utils/storage";
import { logInfo } from "../utils/logger";

export default function Analytics() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);

  useEffect(() => {
    const data = getUrls();
    setUrls(data);
    logInfo("component", `Fetched analytics for ${data.length} URLs`);
  }, []);

  if (urls.length === 0) return <div>No analytics available.</div>;

  return (
    <div style={{ marginTop: 20 }}>
      <Typography variant="h6" gutterBottom>Analytics</Typography>
      <List>
        {urls.map(url => (
          <ListItem key={url.id} divider>
            <ListItemText
              primary={`Short URL: http://localhost:3000/${url.shortCode}`}
              secondary={`Clicks: ${url.clicks.length} | Created at: ${new Date(url.createdAt).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
