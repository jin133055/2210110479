
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { FileCopy as FileCopyIcon } from "@mui/icons-material";
import { getUrls } from "../utils/storage";
import { logInfo } from "../utils/logger";

export default function UrlList() {
  const urls = getUrls();

  const handleCopy = (shortCode: string) => {
    const url = `http://localhost:3000/${shortCode}`;
    navigator.clipboard.writeText(url)
      .then(() => logInfo("component", `Copied URL to clipboard: ${url}`))
      .catch(err => console.error("Copy failed:", err));
  };

  if (urls.length === 0) return <div>No URLs shortened yet.</div>;

  return (
    <List>
      {urls.map(u => (
        <ListItem key={u.id} divider>
          <ListItemText
            primary={`Original: ${u.originalUrl}`}
            secondary={`Short: http://localhost:3000/${u.shortCode} | Clicks: ${u.clicks.length}`}
          />
          <IconButton onClick={() => handleCopy(u.shortCode)}>
            <FileCopyIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
