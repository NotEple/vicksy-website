import { useLayoutEffect } from "react";

export function useTitleUpdate() {
  useLayoutEffect(() => {
    document.title = window.location.pathname + " | " + "Vicksy";
  }, []);

  return;
}
