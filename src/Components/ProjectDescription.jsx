import { Fragment, useEffect, useRef, useState } from "react";

let ProjectDescription = ({ editProject, value: desc }) => {
  let [editMode, setEditMode] = useState(false);

  let descInput = useRef(null);

  let renameProject = () => {
    let value = descInput.current.value.trim();
    editProject({ elem: "desc", value });
    setEditMode(false);
  };

  let handleKeydown = (e) => {
    if (e.key === "Escape") setEditMode(false);
    else if (e.ctrlKey && e.keyCode === 13) renameProject();
  };

  useEffect(() => {
    if (editMode) descInput.current.focus();
  }, [editMode]);

  return editMode ? (
    <textarea
      ref={descInput}
      onBlur={() => setEditMode(false)}
      defaultValue={desc}
      className="project-desc custom-scroll inline h-20 w-full max-w-[450px] resize-none overflow-y-auto rounded border-none bg-transparent text-sm text-muted outline-2 outline-offset-4 outline-border selection:bg-muted selection:text-background-color max-sm:rounded-sm max-sm:text-center"
      onKeyDown={handleKeydown}
    ></textarea>
  ) : (
    <p
      onDoubleClick={() => setEditMode(true)}
      className={`project-desc custom-scroll max-h-20 max-w-[450px] select-none overflow-y-auto text-sm max-vsm:w-full ${
        desc ? "text-muted" : "text-muted/40 line-through"
      }`}
    >
      {(desc &&
        desc.split("\n").map((i, index) =>
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
  );
};

export default ProjectDescription;
