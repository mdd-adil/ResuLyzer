import { useEffect } from "react";
import { usePuterStore } from "lib/puter";

export function PuterInit() {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
    // Polyfill window.puter.kv.delete if missing
    const script = document.createElement('script');
    script.src = '/patchPuterKvDelete.js';
    script.async = true;
    document.head.appendChild(script);
  }, [init]);

  return null;
}
