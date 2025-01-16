import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useKeybordShortcuts from "../hooks/useKeybordShortcuts";
import Backdrop from "./Backdrop";

let ProjectSwitcher = ({
  onClose,
  projects,
  projectsLength,
  switchProjectByIndex,
  currentProjectIndex,
}) => {
  let [activeItem, setActiveItem] = useState(currentProjectIndex);

  let switcher = useRef(null);
  let isMount = useRef(false);

  let selectNext = useCallback(() => {
    setActiveItem((prev) => (prev === projectsLength - 1 ? 0 : prev + 1));
  }, [projectsLength]);

  let selectPrev = useCallback(() => {
    setActiveItem((prev) => (prev === 0 ? projectsLength - 1 : prev - 1));
  }, [projectsLength]);

  let calcScroll = useCallback(
    (smooth) => {
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
    [activeItem],
  );

  let close = useCallback(
    (skip = false, index) => {
      if (!skip) {
        if (index >= 0) {
          switchProjectByIndex(index);
        } else switchProjectByIndex(activeItem);
      }
      onClose();
    },
    [activeItem, onClose, switchProjectByIndex],
  );

  useLayoutEffect(() => {
    selectNext();
  }, [selectNext]);

  useKeybordShortcuts({
    "Shift+9": {
      func: (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectNext();
      },
    },
    "Shift+40": {
      func: (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectNext();
      },
    },
    "Shift+38": {
      func: (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectPrev();
      },
    },
  });

  useEffect(() => {
    if (!isMount.current) {
      calcScroll(false);
      isMount.current = true;
    }
  }, [calcScroll]);

  useEffect(() => {
    let keyupFunc = (e) => {
      if (e.key === "Shift") {
        close();
      }
    };

    calcScroll(true);
    document.addEventListener("keyup", keyupFunc);
    return () => {
      document.removeEventListener("keyup", keyupFunc);
    };
  }, [activeItem, calcScroll, close]);
  return (
    <Backdrop onClick={() => close(true)}>
      <section
        ref={switcher}
        className="custom-scroll-mini fixed left-1/2 top-4 z-[60] mx-[10px] flex max-h-[min(188px,calc(100%-25px))] w-[calc(100%-10px)] max-w-80 -translate-x-[calc(50%+10px)] flex-col gap-1 overflow-y-auto rounded-md border-2 border-border bg-surface/60 px-1 py-1 shadow-lg backdrop-blur-md"
      >
        {projectsLength ? (
          projects.map((i, index) => (
            <div
              key={i.id}
              onClick={() => close(false, index)}
              className={`cursor-pointer rounded-sm bg-on-secondary/20 px-2 py-1 text-text-color hover:bg-on-secondary/25 ${
                index === activeItem ? `bg-on-secondary/35` : ""
              } ${
                index === currentProjectIndex
                  ? "outline outline-2 outline-offset-1 outline-primary"
                  : ""
              }`}
            >
              {i.name}
            </div>
          ))
        ) : (
          <p className="text-center text-text-color">You got no Project</p>
        )}
      </section>
    </Backdrop>
  );
};

export default ProjectSwitcher;
