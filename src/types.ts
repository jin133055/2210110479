// src/types.ts

export interface ClickRecord {
  timestamp: string;
  source?: string;
  location?: string;
  geo?: string;
}

export interface UrlRecord {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  expiry: string;
  clicks: ClickRecord[];
}
