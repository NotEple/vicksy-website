import { useEffect, useState } from "react";

export const useLive = () => {
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    const host =
      import.meta.env.MODE === "development"
        ? "localhost:3001"
        : window.location.host;

    console.log(host);

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://${host}/`);

    console.log(ws);

    ws.onopen = () => console.log("Connected to WebSocket server");
    ws.onmessage = (event) => {
      console.log("Received status:", event.data);
      const data = JSON.parse(event.data);
      setIsLive(data.live);
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, []);

  return { isLive };
};
