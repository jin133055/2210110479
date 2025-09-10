import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUrls, addClick } from "../utils/storage";
import { logInfo, logWarn } from "../utils/logger";

export default function RedirectHandler() {
  const { shortCode } = useParams<{ shortCode: string }>();

  useEffect(() => {
    if (!shortCode) return;

    const urls = getUrls();
    const url = urls.find(u => u.shortCode === shortCode);
    if (!url) {
      logWarn("component", `Attempted redirect to unknown shortcode: ${shortCode}`);
      alert("Short URL not found!");
      return;
    }

    addClick(shortCode, {
      timestamp: new Date().toISOString(),
      source: window.location.href,
      geo: "Unknown" // optional: implement geo lookup
    });

    logInfo("component", `Redirecting ${shortCode} -> ${url.originalUrl}`);
    window.location.href = url.originalUrl;
  }, [shortCode]);

  return <div>Redirecting...</div>;
}
