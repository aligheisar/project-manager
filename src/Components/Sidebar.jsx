import { useRef, useState } from "react";
import { GetProjects } from "../Context/ProjectContext";
import useKeybordShortcuts from "../hooks/useKeybordShortcuts";
import useWindowResize from "../hooks/useWindowResize";
import ProjectItem from "./ProjectItem";
import Input from "./ui/Input";
import Button from "./ui/Button";

let Sidebar = () => {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  let { projects, createProject, currentProjectId, setCurrentProject } =
    GetProjects();

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

  let handleAddNewProject = () => {
    let { value } = input.current;

    if (!value.trim()) {
      input.current.value = "";
      input.current.focus();
      return;
    }
    createProject({ name: value });
    input.current.value = "";
    closeOnSmallView();
  };

  let switchProject = (id) => {
    setCurrentProject(id);
    closeOnSmallView();
  };

  let handleInputKeyDown = (e) => {
    if (e.keyCode === 13) handleAddNewProject();
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
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="backdrop-elem fixed inset-0 z-40"
        ></div>
      )}
      <aside
        className={`sidebar box-shadow z-50 flex h-full w-[370px] shrink-0 flex-col gap-4 rounded-e-2xl bg-gray-600/80 px-5 py-8 text-black backdrop-blur-lg backdrop-filter transition-all duration-300 max-lg:absolute max-sm:w-[350px] max-sm:px-3 max-vsm:w-full max-vsm:rounded-none max-vsm:pt-11 ${
          sidebarOpen
            ? "left-0"
            : "-left-[370px] max-sm:-left-[350px] max-vsm:-left-full"
        }`}
      >
        <span
          onClick={toggleSidebar}
          className={`absolute left-full cursor-pointer rounded-e-full bg-gray-600/80 px-2 py-2 pr-[14px] text-lg text-gray-300 backdrop-blur-lg backdrop-filter transition-color-postions duration-200 max-vsm:left-auto max-vsm:right-3 max-vsm:top-2 max-vsm:flex max-vsm:h-7 max-vsm:w-7 max-vsm:items-center max-vsm:justify-center max-vsm:rounded-[4px] max-vsm:bg-gray-100/0 max-vsm:p-0 max-vsm:backdrop-filter-none max-vsm:hover:bg-gray-100/20 lg:hidden ${
            !sidebarOpen
              ? "max-vsm:-right-10 max-vsm:bg-gray-100/60 max-vsm:font-bold max-vsm:text-gray-800 max-vsm:hover:bg-gray-100/80"
              : ""
          }`}
        >
          {sidebarOpen ? <>&#10006;</> : <>&#9776;</>}
        </span>
        <section className="flex flex-col gap-1">
          <Input
            ref={input}
            type="text"
            placeholder="Project Name"
            onKeyDown={handleInputKeyDown}
          />
          <Button
            onClick={handleAddNewProject}
          >
            Add Project
          </Button>
        </section>
        {projects && projects.length ? (
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
          <section className="flex h-full w-full items-center justify-center">
            <p className="-translate-y-16 text-lg text-gray-950">No Project</p>
          </section>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
