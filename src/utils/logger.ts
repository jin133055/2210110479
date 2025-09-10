// src/utils/logger.ts
export type Stack = "frontend" | "backend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type PackageName = "api" | "component" | "hook" | "page" | "state" | "style";

interface LogPayload {
  stack: Stack;
  level: Level;
  package: PackageName | "handler";
  message: string;
}

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log(
  stack: Stack,
  level: Level,
  packageName: PackageName | "handler",
  message: string
) {
  const payload: LogPayload = {
    stack,
    level,
    package: packageName,
    message,
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn("Failed to log:", message);
    }
  } catch (err) {
    console.error("Error sending log:", err);
  }
}

export const logDebug = (pkg: PackageName, msg: string) => Log("frontend", "debug", pkg, msg);
export const logInfo = (pkg: PackageName, msg: string) => Log("frontend", "info", pkg, msg);
export const logWarn = (pkg: PackageName, msg: string) => Log("frontend", "warn", pkg, msg);
export const logError = (pkg: PackageName, msg: string) => Log("frontend", "error", pkg, msg);
export const logFatal = (pkg: PackageName, msg: string) => Log("frontend", "fatal", pkg, msg);
