import { useEffect } from "react";

let useKeybordShortcuts = (handlers) => {
  useEffect(() => {
    let handleKeyDown = (e) => {
      let keyCombo = `${e.ctrlKey ? "Ctrl+" : ""}${e.shiftKey ? "Shift+" : ""}${e.key}`;
      if (handlers[keyCombo]) {
        e.preventDefault();
        handlers[keyCombo]();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlers]);
};

export default useKeybordShortcuts;
