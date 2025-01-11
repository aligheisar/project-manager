import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { GetContext } from "../Context/Context";
import { formatHeader } from "../util/formater";
import { Trash } from "./Icons";
import NoProject from "./NoProject";
import Todos from "./Todos";
import AddTodo from "./AddTodo";

let Project = () => {
  let { getCurrentProj, deleteProj, dataLen, renameProj } = GetContext();
  let currentProj = getCurrentProj();

  let [editMode, setEditMode] = useState(false);

  let nameInput = useRef(null);

  let handleRenameProj = useCallback(() => {
    let value = nameInput.current.value.trim();
    if (value) renameProj(value);
    setEditMode(false);
  }, [renameProj]);

  useEffect(() => {
    if (editMode) nameInput.current.focus();

    let clickFunc = (e) => {
      if (editMode) {
        if (e.target === nameInput.current) return;
        handleRenameProj();
      }
    };

    document.addEventListener("click", clickFunc);

    return () => {
      document.removeEventListener("click", clickFunc);
    };
  }, [editMode, handleRenameProj]);

  let handleInputKeydown = (e) => {
    if (e.key === "Escape") setEditMode(false);
    if (e.keyCode === 13) {
      handleRenameProj();
    }
  };

  return (
    <section className="project-container short-wide-ed:bg-black custom-scroll mx-auto flex h-full w-3/4 flex-col overflow-x-hidden max-lg:w-full">
      {currentProj ? (
        <>
          <section className="todo_details-container flex flex-col gap-6 px-7 py-11 pb-4 max-sm:px-4 max-sm:py-6">
            <div className="project-details flex items-start justify-between gap-3 max-sm:flex-col max-sm:items-center max-sm:text-center">
              <div className="name_desc flex max-w-[750px] flex-1 flex-col justify-between gap-3 max-sm:items-center">
                {editMode ? (
                  <input
                    ref={nameInput}
                    onKeyDown={handleInputKeydown}
                    className="-m-[2px] w-full text-pretty rounded-md border-2 border-gray-400 bg-gray-800 text-5xl font-bold leading-snug text-gray-400 outline-none selection:bg-gray-400 selection:text-gray-800 max-sm:text-4xl"
                    type="text"
                    defaultValue={currentProj.name}
                  />
                ) : (
                  <h2
                    onDoubleClick={() => setEditMode(true)}
                    className="select-none text-pretty text-5xl font-bold leading-snug text-gray-500 max-sm:text-4xl"
                  >
                    {formatHeader(currentProj.name).map((item, index) => (
                      <Fragment key={index}>
                        {index === 0 ? "" : " "}
                        {item}
                      </Fragment>
                    ))}
                  </h2>
                )}
                <p
                  className={`project-desc custom-scroll max-h-20 max-w-[450px] overflow-y-auto text-sm opacity-70 ${
                    currentProj.desc
                      ? "text-gray-400"
                      : "text-gray-600 line-through"
                  }`}
                >
                  {currentProj.desc || "No Description"}
                </p>
              </div>
              <button
                onClick={deleteProj}
                className="mt-2 flex items-center gap-2 rounded-[4px] bg-gray-800 fill-gray-300 px-3 py-[6px] text-gray-300 shadow-md shadow-black/5 transition-colors duration-150 hover:bg-gray-700 hover:fill-red-500 hover:text-red-500 max-sm:rounded-full max-sm:px-10"
              >
                <Trash inher /> Delete
              </button>
            </div>
            <AddTodo />
          </section>
          <Todos todos={currentProj.todos} />
        </>
      ) : (
        !dataLen && <NoProject />
      )}
    </section>
  );
};

export default Project;
