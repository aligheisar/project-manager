import { useEffect, useRef, useState } from "react";
import { GetProjects } from "../Context/ProjectContext";
import ProjectItem from "./ProjectItem";

let Sidebar = () => {
  let [sidebarOpen, setSidebarOpen] = useState(false);
  let { projects, setCurrentProject, createProject } = GetProjects();

  let [value, setValue] = useState("");

  let input = useRef(null);

  let toggleSidebar = () =>
    setSidebarOpen((prev) => {
      if (prev) {
        input.current.blur();
        setValue("");
      } else input.current.focus();
      return !prev;
    });

  useEffect(() => {
    let windowResizeFunc = () => {
      if (window.innerWidth > 1024) setSidebarOpen(false);
    };
    let keydownFunc = (e) => {
      if (sidebarOpen && e.key === "Escape") {
        setSidebarOpen(false);
        input.current.blur();
        setValue("");
      }
      if (e.key.toLowerCase() === "s" && e.ctrlKey) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    /// fix later !!!!!
    let clickFunc = (e) => {
      if (sidebarOpen) {
        if (e.target.className.includes("backdrop-elem")) {
          setSidebarOpen(false);
        }
      }
    };
    window.addEventListener("resize", windowResizeFunc);
    document.addEventListener("keydown", keydownFunc);
    document.addEventListener("click", clickFunc);
    return () => {
      window.removeEventListener("resize", windowResizeFunc);
      document.removeEventListener("keydown", keydownFunc);
      document.removeEventListener("click", clickFunc);
    };
  }, [sidebarOpen]);

  let closeOnSmallView = () =>
    window.innerWidth < 420 ? setSidebarOpen(false) : null;

  let handleAddNewProject = () => {
    if (!value.trim()) {
      setValue("");
      input.current.focus();
      return;
    }
    createProject({ name: value });
    setValue("");
    closeOnSmallView();
  };

  let SwitchProject = (id) => {
    setCurrentProject(id);
    closeOnSmallView();
  };

  return (
    <>
      {sidebarOpen && <div className="backdrop-elem fixed inset-0 z-40"></div>}
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
          <input
            ref={input}
            className="border-2 border-gray-700 bg-gray-100 px-2 py-1 outline-none placeholder:transition-colors placeholder:duration-100 focus-within:placeholder:text-gray-700"
            type="text"
            placeholder="Project Name"
            value={value}
            onKeyDown={(e) => (e.keyCode === 13 ? handleAddNewProject() : null)}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button
            onClick={handleAddNewProject}
            className="rounded-[4px] bg-gray-200 py-1 font-semibold text-gray-950 shadow-md shadow-gray-700/20"
          >
            Add Project
          </button>
        </section>
        {projects && projects.length ? (
          <section className="custom-scroll flex max-h-full flex-col gap-1 overflow-y-auto overflow-x-hidden rounded-md">
            {projects.map((proj) => (
              <ProjectItem
                active={proj.id === setCurrentProject}
                onClick={() => SwitchProject(proj.id)}
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
