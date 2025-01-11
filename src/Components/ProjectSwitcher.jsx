import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

let ProjectSwitcher = ({ projects, close, findCurrent }) => {
  let currentProj = findCurrent();

  let [activeItem, setActiveItem] = useState(currentProj);

  let switcher = useRef(null);

  let selectNext = useCallback(() => {
    setActiveItem((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  useLayoutEffect(() => selectNext(), [selectNext]);

  useEffect(() => {
    let keydownFunc = (e) => {
      if (e.shiftKey && e.key === "Tab") selectNext();
    };
    let keyupFunc = (e) => {
      if (e.key === "Shift") {
        close(activeItem);
      }
    };

    let calcScroll = () => {
      let _eachItem = 32;
      let _gap = 4;
      switcher.current.scrollTo({
        top: (_eachItem + _gap) * (activeItem - 1),
        behavior: "smooth",
      });
    };

    calcScroll();
    document.addEventListener("keydown", keydownFunc);
    document.addEventListener("keyup", keyupFunc);
    return () => {
      document.removeEventListener("keydown", keydownFunc);
      document.removeEventListener("keyup", keyupFunc);
    };
  }, [activeItem, close, selectNext]);
  return (
    <section
      ref={switcher}
      className="custom-scroll-mini fixed left-1/2 top-4 z-[60] mx-[10px] flex max-h-[min(188px,calc(100%-25px))] w-[calc(100%-10px)] max-w-80 -translate-x-[calc(50%+10px)] flex-col gap-1 overflow-y-auto rounded-md border-2 border-gray-400 bg-gray-600/50 px-1 py-1 shadow-lg backdrop-blur-md"
    >
      {projects.length ? (
        projects.map((i, index) => (
          <div
            key={i.id}
            className={`cursor-pointer rounded-sm bg-gray-100/25 px-2 py-1 text-gray-950 ${
              index === activeItem ? `bg-gray-100/45` : ""
            } ${
              index === currentProj
                ? "outline outline-1 outline-offset-1 outline-sky-500"
                : ""
            }`}
          >
            {i.name}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">You got no Project</p>
      )}
    </section>
  );
};

export default ProjectSwitcher;
