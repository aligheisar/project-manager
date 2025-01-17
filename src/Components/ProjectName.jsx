import { Fragment, useEffect, useRef, useState } from "react";
import { formatHeader } from "../util/formater";

let ProjectName = ({ editProject, value: name }) => {
  let [editMode, setEditMode] = useState(false);

  let nameInput = useRef(null);
  let lastTime = useRef(0);

  let renameProject = () => {
    let value = nameInput.current.value.trim();
    if (value) editProject({ elem: "name", value });
    setEditMode(false);
  };

  let handleKeydown = (e) => {
    if (e.key === "Escape") setEditMode(false);
    else if (e.keyCode === 13) renameProject();
  };

  let handleDuobleClick = (e) => {
    e.preventDefault();
    let now = new Date();
    if (now - lastTime.current < 300) {
      setEditMode(true);
    }
    lastTime.current = now;
  };

  useEffect(() => {
    if (editMode) nameInput.current.focus();
  }, [editMode]);

  return editMode ? (
    <input
      ref={nameInput}
      onKeyDown={handleKeydown}
      onBlur={() => renameProject()}
      className="proj-name w-[min(570px,100%)] text-pretty rounded border-none bg-transparent text-5xl font-bold leading-snug text-primary outline outline-2 outline-offset-4 outline-border selection:bg-primary selection:text-background-color focus:border-none max-sm:rounded-sm max-sm:text-center max-sm:text-4xl"
      type="text"
      defaultValue={name}
    />
  ) : (
    <h2
      onPointerDown={handleDuobleClick}
      className="proj-name select-none text-pretty text-5xl font-bold leading-snug text-primary max-sm:text-4xl"
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
