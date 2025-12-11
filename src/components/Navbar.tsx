import { useEffect, useState } from "react";
import vicksyW from "../assets/vicksyW.png";
import { twm } from "../utils/twm";
import { Link, NavLink } from "react-router-dom";
import vicksyLogo from "../assets/vicksyLogo.png";

export default function Navbar() {
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

  return (
    <nav className="h-20 bg-primary flex justify-center relative shadow-2xl">
      <div className="flex justify-between w-[1000px]">
        <Link
          title="Home"
          to="/"
          className="font-pixel text-6xl items-center flex text-white hover:cursor-vicksyGa"
        >
          {/* Vicksy */}
          <img src={vicksyLogo} className="h-3/4" />
        </Link>

        <div className="border-2 rounded-full border-bg-light absolute top-3 left-1/2 -translate-x-1/2 z-50">
          <a
            title="twitch.tv/vicksy"
            href="https://twitch.tv/vicksy"
            target="_blank"
          >
            <img
              src={vicksyW}
              className="rounded-full relative hover:animate-wiggle hover:cursor-vicksyGa"
              alt="Profile picture"
            />
            <div
              className={twm(
                "text-base w-20 text-center tracking-wider text-white absolute top-23 left-2/4 rounded-2xl font-pixel -translate-x-1/2 hover:scale-105 hover:ease-in hover:duration-200 hover:transition-all hover:cursor-vicksyGa",
                isLive ? "bg-red-600 live-ping" : "bg-neutral-500 text-sm p-0.5"
              )}
            >
              <span>{isLive ? "LIVE" : "OFFLINE"}</span>
            </div>
          </a>
        </div>

        <ul className="flex flex-row gap-8 items-center font-pixel text-3xl text-white">
          <Link
            title="Merch"
            to="https://vicksy-shop.fourthwall.com/"
            target="_blank"
            className="px-2 hover:cursor-vicksyGa hover:outline-2 rounded-md"
          >
            Merch
          </Link>
          <NavLink
            title="Socials"
            to="/socials"
            className="px-2 hover:cursor-vicksyGa hover:outline-2 rounded-md"
          >
            Socials
          </NavLink>
          <NavLink
            title="Dashboard"
            to="/dashboard"
            className="px-2 hover:cursor-vicksyGa hover:outline-2 rounded-md"
          >
            Dashboard
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}
