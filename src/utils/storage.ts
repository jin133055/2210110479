// src/utils/storage.ts
import type { UrlRecord, ClickRecord } from "../types";
import { logInfo, logError, logWarn } from "./logger";

const URL_KEY = "shortenedUrls";

export const getUrls = (): UrlRecord[] => {
  const data = localStorage.getItem(URL_KEY);
  return data ? JSON.parse(data) : [];
};

export const addUrl = (url: UrlRecord) => {
  try {
    const urls = getUrls();
    urls.push(url);
    localStorage.setItem(URL_KEY, JSON.stringify(urls));
    logInfo("state", `URL added: ${url.originalUrl} -> ${url.shortCode}`);
  } catch (err) {
    logError("state", `Failed to add URL: ${(err as Error).message}`);
  }
};

export const addClick = (shortCode: string, click: ClickRecord) => {
  try {
    const urls = getUrls();
    const url = urls.find(u => u.shortCode === shortCode);
    if (!url) {
      logWarn("state", `Click attempted on non-existent shortCode: ${shortCode}`);
      return;
    }
    url.clicks.push(click);
    localStorage.setItem(URL_KEY, JSON.stringify(urls));
    logInfo("state", `Click recorded on ${shortCode} from ${click.source} at ${click.timestamp}`);
  } catch (err) {
    logError("state", `Failed to record click: ${(err as Error).message}`);
  }
};
