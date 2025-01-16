import { useCallback } from "react";

let useScroll = (switcher, activeItem) => {
  let calcScroll = useCallback(
    (smooth) => {
      if (!switcher.current) return;

      let _eachItem = 32;
      let _gap = 4;

      let scrollTo = (smooth, value) => {
        switcher.current.scrollTo({
          top: value,
          behavior: smooth === true ? "smooth" : "instant",
        });
      };

      let orZero = (value) => Math.max(value, 0);

      let calcTop = Math.max((_eachItem + _gap) * (activeItem - 1), 0);
      let calcT = orZero((_eachItem + _gap) * (activeItem - 4));
      let calcB = orZero((_eachItem + _gap) * activeItem);

      let { scrollTop } = switcher.current;

      if (calcTop - scrollTop > 108) {
        scrollTo(smooth, calcT);
      } else if (calcTop - scrollTop < -36) {
        scrollTo(smooth, calcB);
      } else if (calcTop === 0) {
        scrollTo(smooth, 0);
      }
    },
    [activeItem, switcher],
  );

  return calcScroll;
};

export default useScroll;
