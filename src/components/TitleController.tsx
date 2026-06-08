import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLive } from "@/hooks/useLive";
import vicksyWLIVE from "/vicksyWLIVE.png";

export default function TitleController() {
  const location = useLocation();
  const { isLive } = useLive();

  useLayoutEffect(() => {
    const routes = [
      { path: "/", title: "Home | Vicksy" },
      { path: "/merch", title: "Merch | Vicksy" },
      { path: "/socials", title: "Socials | Vicksy" },
      { path: "/dashboard", title: "Dashboard | Vicksy" },
    ];

    const favicon = document.getElementById("favicon") as HTMLLinkElement;

    if (isLive) favicon.href = vicksyWLIVE;

    const route = routes.find((r) => r.path === location.pathname);
    if (route?.title)
      document.title = `${isLive ? "(LIVE)" : ""} ${route.title}`;
  }, [isLive, location.pathname]);

  return null;
}
