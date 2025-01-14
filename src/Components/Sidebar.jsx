import { useRef, useState } from "react";
import { GetProjects } from "../Context/ProjectContext";
import useKeybordShortcuts from "../hooks/useKeybordShortcuts";
import useWindowResize from "../hooks/useWindowResize";
import AddProject from "./AddProject.jsx";
import ProjectItem from "./ProjectItem";
import ThemeChanger from "./ThemeChanger";
import Backdrop from "./Backdrop.jsx";

let Sidebar = () => {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  let {
    projects,
    projectLength,
    createProject,
    currentProjectId,
    setCurrentProject,
  } = GetProjects();

  let input = useRef(null);

  let toggleSidebar = () =>
    setSidebarOpen((prev) => {
      if (prev) {
        input.current.blur();
        input.current.value = "";
      } else input.current.focus();
      return !prev;
    });

  let closeSidebar = (clear = false) => {
    setSidebarOpen(false);
    if (clear) {
      input.current.blur();
      input.current.value = "";
    }
  };

  let closeOnSmallView = () =>
    window.innerWidth < 420 ? closeSidebar(true) : null;

  let switchProject = (id) => {
    setCurrentProject(id);
    closeOnSmallView();
  };

  useWindowResize(() => {
    if (window.innerWidth > 1024) setSidebarOpen(false);
  });

  useKeybordShortcuts({
    Escape: {
      func: () => {
        if (sidebarOpen) closeSidebar(true);
      },
    },
    "Ctrl+s": {
      func: () => {
        if (window.innerWidth < 1024) toggleSidebar();
      },
      prevent: true,
    },
    "Ctrl+س": {
      func: () => {
        if (window.innerWidth < 1024) toggleSidebar();
      },
      prevent: true,
    },
  });

  return (
    <>
      {sidebarOpen && <Backdrop onClose={closeSidebar} className="z-40" />}
      <aside
        //!!!
        className={`sidebar box-shadow z-50 flex h-full w-[370px] shrink-0 flex-col gap-4 rounded-e-2xl bg-surface px-5 py-8 backdrop-blur-lg backdrop-filter transition-all duration-300 max-lg:absolute max-sm:w-[350px] max-sm:px-3 max-vsm:w-full max-vsm:rounded-none max-vsm:pt-11 ${
          sidebarOpen
            ? "left-0"
            : "-left-[370px] max-sm:-left-[350px] max-vsm:-left-full"
        }`}
      >
        <span
          onClick={toggleSidebar}
          //!!!
          className={`absolute left-[calc(100%-1px)] cursor-pointer rounded-e-full bg-surface pl-2 py-2 pr-[14px] text-lg text-text-color transition-color-postions duration-200 max-vsm:right-3 max-vsm:top-2 max-vsm:flex max-vsm:h-7 max-vsm:w-7 max-vsm:items-center max-vsm:justify-center max-vsm:rounded max-vsm:bg-gray-100/0 max-vsm:p-0 max-vsm:backdrop-filter-none max-vsm:hover:bg-gray-100/20 lg:hidden ${
            !sidebarOpen
              ? "max-vsm:bg-whtie/60 max-vsm:-right-10 max-vsm:font-bold max-vsm:text-text-color max-vsm:hover:bg-white/80"
              : "max-vsm:left-auto"
          }`}
        >
          {sidebarOpen ? <>&#10006;</> : <>&#9776;</>}
        </span>
        <AddProject
          ref={input}
          createProject={createProject}
          closeOnSmallView={closeOnSmallView}
        />
        {projects && projectLength > 0 ? (
          <section className="custom-scroll flex max-h-full flex-col gap-1 overflow-y-auto overflow-x-hidden rounded-md">
            {projects.map((proj) => (
              <ProjectItem
                active={proj.id === currentProjectId}
                onClick={() => switchProject(proj.id)}
                key={proj.id}
                project={proj}
              />
            ))}
          </section>
        ) : (
          <NoProject />
        )}
        <ThemeChanger />
      </aside>
    </>
  );
};

export default Sidebar;

let NoProject = () => {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <p className="-translate-y-16 text-lg text-text-color">No Project</p>
    </section>
  );
};
