import { useEffect } from "react";

let useKeybordShortcuts = (shortcuts) => {
  useEffect(() => {
    let handleKeyDown = (e) => {
      let keyCombination = [];
      if (e.ctrlKey) keyCombination.push("Ctrl");
      if (e.shiftKey) keyCombination.push("Shift");
      if (e.altKey) keyCombination.push("Alt");
      keyCombination.push(e.keyCode.toString());

      let combination = keyCombination.join("+");
      let shortcut = shortcuts[combination];

      if (shortcut) {
        if (shortcut.prevent) e.preventDefault();
        if (shortcut.stopGrow) e.stopPropagation();
        shortcut.func(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
};

export default useKeybordShortcuts;
