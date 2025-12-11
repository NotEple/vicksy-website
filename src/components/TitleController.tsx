import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TitleController() {
  const location = useLocation();

  const routes = [
    { path: "/", title: "Home | Vicksy" },
    { path: "/merch", title: "Merch | Vicksy" },
    { path: "/socials", title: "Socials | Vicksy" },
    { path: "/dashboard", title: "Dashboard | Vicksy" },
  ];

  useLayoutEffect(() => {
    const route = routes.find((r) => r.path === location.pathname);
    if (route?.title) document.title = route.title;
  });

  return null;
}
