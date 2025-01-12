import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { GetOverlay } from "../Context/OverlayContext";
import { formatHeader } from "../util/formater";
import { Trash } from "./Icons";
import { GetProjects } from "../Context/ProjectContext";

let ProjectDetails = () => {
  let { currentProject, editProject } = GetProjects();
  let { openConfirmModal } = GetOverlay();

  let [editMode, setEditMode] = useState({ state: false, elem: null });

  let nameInput = useRef(null);
  let descInput = useRef(null);

  let handleInputKeydown = (e) => {
    if (e.key === "Escape") setEditMode({ state: false, elem: null });
    else if (e.keyCode === 13 && editMode.elem === "name") {
      handleRenameProj();
    } else if (e.keyCode === 13 && e.ctrlKey && editMode.elem === "desc")
      handleRenameProj();
  };

  let handleRenameProj = useCallback(() => {
    if (editMode.elem === "name") {
      let value = nameInput.current.value.trim();
      if (value) {
        editProject({ elem: "name", value });
      }
    } else if (editMode.elem === "desc") {
      let value = descInput.current.value.trim();
      editProject({ elem: "desc", value });
    }
    setEditMode({ state: false, elem: null });
  }, [editMode.elem, editProject]);

  useEffect(() => {
    if (editMode.state && editMode.elem === "name") nameInput.current.focus();
    else if (editMode.state && editMode.elem === "desc")
      descInput.current.focus();

    let clickFunc = (e) => {
      if (editMode.state) {
        if (e.target === nameInput.current || e.target === descInput.current)
          return;
        handleRenameProj();
      }
    };

    document.addEventListener("mousedown", clickFunc);

    return () => {
      document.removeEventListener("mousedown", clickFunc);
    };
  }, [editMode, handleRenameProj]);

  return (
    <div className="project-details flex items-start justify-between gap-3 max-sm:flex-col max-sm:items-center max-sm:text-center">
      <div className="name_desc flex w-full max-w-[750px] flex-1 flex-col justify-between gap-3 max-sm:items-center">
        {editMode.state && editMode.elem === "name" ? (
          <input
            ref={nameInput}
            onKeyDown={handleInputKeydown}
            onBlur={() => setEditMode({ state: false, elem: null })}
            className="proj-name w-full text-pretty rounded-md border-none bg-gray-800 text-5xl font-bold leading-snug text-gray-400 outline-2 outline-offset-4 outline-gray-400 selection:bg-gray-400 selection:text-gray-800 focus:border-none max-sm:text-4xl"
            type="text"
            defaultValue={currentProject.name}
          />
        ) : (
          <h2
            onDoubleClick={() => setEditMode({ state: true, elem: "name" })}
            className="proj-name select-none text-pretty text-5xl font-bold leading-snug text-gray-500 max-sm:text-4xl"
          >
            {formatHeader(currentProject.name).map((item, index) => (
              <Fragment key={index}>
                {index === 0 ? "" : " "}
                {item}
              </Fragment>
            ))}
          </h2>
        )}
        {editMode.state && editMode.elem === "desc" ? (
          <textarea
            ref={descInput}
            onBlur={() => setEditMode({ state: false, elem: null })}
            defaultValue={currentProject.desc}
            className="project-desc custom-scroll inline h-20 w-full max-w-[450px] resize-none overflow-y-auto rounded-md border-none bg-gray-800 text-sm text-gray-400 outline-2 outline-offset-4 outline-gray-400 selection:bg-gray-400 selection:text-gray-800"
            onKeyDown={handleInputKeydown}
          ></textarea>
        ) : (
          <p
            onDoubleClick={() => setEditMode({ state: true, elem: "desc" })}
            className={`project-desc custom-scroll max-h-20 max-w-[450px] select-none overflow-y-auto text-sm opacity-70 max-vsm:w-full ${
              currentProject.desc
                ? "text-gray-400"
                : "text-gray-600 line-through"
            }`}
          >
            {(currentProject.desc &&
              currentProject.desc.split("\n").map((i, index) =>
                index === 0 ? (
                  <Fragment key={index}>{i}</Fragment>
                ) : (
                  <Fragment key={index}>
                    <br />
                    {i}
                  </Fragment>
                ),
              )) ||
              "No Description"}
          </p>
        )}
      </div>
      <button
        onClick={openConfirmModal}
        className="mt-2 flex items-center gap-2 rounded-[4px] bg-gray-800 fill-gray-300 px-3 py-[6px] text-gray-300 shadow-md shadow-black/5 outline-none transition-colors duration-150 hover:bg-gray-700 hover:fill-red-500 hover:text-red-500 max-sm:rounded-full max-sm:px-10"
      >
        <Trash inher /> Delete
      </button>
    </div>
  );
};

export default ProjectDetails;
