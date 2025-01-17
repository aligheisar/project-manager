import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useKeybordShortcuts from "../hooks/useKeybordShortcuts";
import Backdrop from "./Backdrop";
import ProjectSwitcherList from "./ProjectSwitcherList";
import useScroll from "../hooks/useScroll";

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

  let calcScroll = useScroll(switcher, activeItem);

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
    "Shift+36": {
      func: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveItem(0);
      },
    },
    "Shift+35": {
      func: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveItem(projectsLength - 1);
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
          <ProjectSwitcherList
            projects={projects}
            activeItem={activeItem}
            currentProjectIndex={currentProjectIndex}
            close={close}
          />
        ) : (
          <p className="text-center text-text-color">You got no Project</p>
        )}
      </section>
    </Backdrop>
  );
};

export default ProjectSwitcher;
