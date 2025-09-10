export function Log(
  stack: "frontend" | "backend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg: string,
  message: string
) {
  fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stack, level, package: pkg, message }),
  }).catch(console.error);
}
