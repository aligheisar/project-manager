import { Fragment, useEffect, useRef, useState } from "react";
import { formatHeader } from "../util/formater";

let ProjectName = ({ editProject, value: name }) => {
  let [editMode, setEditMode] = useState(false);

  let nameInput = useRef(null);

  let renameProject = () => {
    let value = nameInput.current.value.trim();
    if (value) editProject({ elem: "name", value });
    setEditMode(false);
  };

  let handleKeydown = (e) => {
    if (e.key === "Escape") setEditMode(false);
    else if (e.keyCode === 13) renameProject();
  };

  useEffect(() => {
    if (editMode) nameInput.current.focus();
  }, [editMode]);

  return editMode ? (
    <input
      ref={nameInput}
      onKeyDown={handleKeydown}
      onBlur={() => setEditMode(false)}
      className="proj-name w-full text-pretty rounded-md border-none bg-gray-800 text-5xl font-bold leading-snug text-gray-400 outline-2 outline-offset-4 outline-gray-400 selection:bg-gray-400 selection:text-gray-800 focus:border-none max-sm:text-4xl"
      type="text"
      defaultValue={name}
    />
  ) : (
    <h2
      onDoubleClick={() => setEditMode(true)}
      className="proj-name select-none text-pretty text-5xl font-bold leading-snug text-gray-500 max-sm:text-4xl"
    >
      {formatHeader(name).map((item, index) => (
        <Fragment key={index}>
          {index === 0 ? "" : " "}
          {item}
        </Fragment>
      ))}
    </h2>
  );
};

export default ProjectName;
