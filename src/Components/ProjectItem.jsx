import { shortText } from "../util/formater";

let ProjectItem = ({ project, onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={`transition-shadow-colors flex cursor-pointer flex-col gap-1 duration-150 hover:shadow-lg ${
        active ? "bg-gray-100/80" : "bg-gray-100/40 hover:bg-gray-100/60"
      } rounded-sm px-2 py-2`}
    >
      <h3 className="text-pretty text-xl text-gray-950">
        {shortText(project.name, 29)}
      </h3>
      {project?.desc ? (
        <p className="text-wrap text-sm text-gray-800">
          {shortText(project.desc)}
        </p>
      ) : null}
    </div>
  );
};

export default ProjectItem;
