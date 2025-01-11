import { useEffect } from "react";

let useWindowResize = (func) => {
  useEffect(() => {
    window.addEventListener("resize", func);

    return () => window.removeEventListener("resize", func);
  });
};

export default useWindowResize;
