import { createContext, useContext, useState } from "react";

let overlayContext = createContext();

export let GetOverlay = () => useContext(overlayContext);

export default function OverlayProvider({ children }) {
  let [overlay, setOverlay] = useState({ type: null, props: {} });

  let openOverlay = (type, props = {}) => {
    setOverlay({ type, props });
  };

  let closeOverlay = () => {
    setOverlay({ type: null, props: {} });
  };

  let value = { overlay, openOverlay, closeOverlay };
  return (
    <overlayContext.Provider value={value}>{children}</overlayContext.Provider>
  );
}
