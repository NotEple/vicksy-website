import path from "path";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { ApiClient } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

console.log(clientId, clientSecret);

const authProvider = new AppTokenAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

const app = express();
const httpServer = createServer(app);
const ws = new WebSocketServer({ server: httpServer });

// ------------------------------
// DEV vs PROD handling for Vite
// ------------------------------

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");

  // Serve static built client
  app.use(express.static(distPath));

  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  console.log("Running in PRODUCTION mode");
} else {
  // Use Vite's dev server with middleware
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  console.log("Running in DEVELOPMENT mode");
}

// ------------------------------
// Twitch polling + WebSockets
// ------------------------------

setInterval(async () => {
  try {
    const stream = await apiClient.streams.getStreamByUserName("Vicksy");
    const live = !!stream;

    ws.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ live }));
      }
    });
  } catch (e) {
    console.error("Error checking Twitch status:", e);
  }
}, 30000);

// ------------------------------
// Start server
// ------------------------------

httpServer.listen(process.env.PORT, () => {
  ws.on("connection", (socket) => {
    console.log("New WebSocket connection");
  });

  console.log("Server listening on http://localhost:3001");
});
