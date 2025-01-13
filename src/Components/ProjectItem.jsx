import { shortText } from "../util/formater";

let ProjectItem = ({ project, onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={`transition-shadow-colors flex cursor-pointer flex-col gap-1 shadow-lg duration-150 ${
        active
          ? "bg-background-color/100"
          : "bg-background-color/50 hover:bg-background-color/70"
      } rounded-sm px-2 py-2`}
    >
      <h3 className="text-pretty text-xl text-text-color">
        {shortText(project.name, 29)}
      </h3>
      {project?.desc ? (
        <p className="text-wrap text-sm text-muted">
          {shortText(project.desc)}
        </p>
      ) : null}
    </div>
  );
};

export default ProjectItem;
