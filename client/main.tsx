import { createRoot, Root } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

// Reuse root across HMR updates to prevent multiple createRoot calls
declare global {
  interface Window {
    __REACT_ROOT__?: Root;
  }
}

if (window.__REACT_ROOT__) {
  window.__REACT_ROOT__.render(<App />);
} else {
  const root = createRoot(container);
  window.__REACT_ROOT__ = root;
  root.render(<App />);
}
