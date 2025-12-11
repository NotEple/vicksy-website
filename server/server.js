// server.js
import path from "path";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { ApiClient } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

const authProvider = new AppTokenAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

const app = express();
const httpServer = createServer(app);
const ws = new WebSocketServer({ server: httpServer });

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
  const dist = path.resolve(__dirname, "../dist");
  app.use(express.static(dist));
  app.get(/.*/, (req, res) => res.sendFile(path.join(dist, "index.html")));
}

let lastStatus = { live: false };

// Poll Twitch and broadcast to all clients
async function checkTwitchStatus() {
  try {
    const stream = await apiClient.streams.getStreamByUserName("Vicksy");
    const live = !!stream;

    // Only broadcast if status changed
    if (lastStatus.live !== live) {
      lastStatus = { live };
      ws.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(lastStatus));
        }
      });
      console.log("Twitch status updated:", live ? "LIVE" : "OFFLINE");
    }
  } catch (e) {
    console.error("Error checking Twitch status:", e);
  }
}

// Run once immediately, then every 30s
checkTwitchStatus();
setInterval(checkTwitchStatus, 30000);

// Handle new WebSocket connections
ws.on("connection", (socket) => {
  console.log("New WebSocket connection");
  // Immediately send last known status
  socket.send(JSON.stringify(lastStatus));
});

// Start HTTP server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
