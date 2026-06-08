import { Link, NavLink } from "react-router-dom";
import vicksyW from "@/assets/vicksyW.png";
import { twm } from "@/utils/twm";
import vicksyLogo from "@/assets/vicksyLogo.png";
import { useLive } from "@/hooks/useLive";

export default function Navbar() {
  const { isLive } = useLive();

  return (
    <nav className="h-20 bg-primary flex justify-center relative shadow-2xl">
      <div className="flex justify-between w-[1000px]">
        <Link
          title="Home"
          to="/"
          className="font-pixel text-6xl items-center flex text-white"
        >
          {/* Vicksy */}
          <img src={vicksyLogo} className="h-3/4" />
        </Link>

        <div className="border-2 rounded-full border-bg-light absolute top-3 left-1/2 -translate-x-1/2 z-50">
          <a
            title="twitch.tv/vicksy"
            href="https://twitch.tv/vicksy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={vicksyW}
              className="rounded-full relative hover:animate-wiggle"
              alt="Profile picture"
            />
            <div
              className={twm(
                "text-base w-20 text-center tracking-wider text-white absolute top-23 left-2/4 rounded-2xl font-pixel -translate-x-1/2 hover:scale-105 hover:ease-in hover:duration-200 hover:transition-all",
                isLive
                  ? "bg-red-600 live-ping"
                  : "bg-neutral-500 text-sm p-0.5",
              )}
            >
              <span>{isLive ? "LIVE" : "OFFLINE"}</span>
            </div>
          </a>
        </div>

        <ul className="flex flex-row gap-8 items-center font-pixel text-3xl text-white">
          <a
            title="Merch"
            href="https://vicksy-shop.fourthwall.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 hover:outline-2 rounded-md"
          >
            Merch
          </a>
          <NavLink
            title="Socials"
            to="/socials"
            className="px-2 hover:outline-2 rounded-md"
          >
            Socials
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}
