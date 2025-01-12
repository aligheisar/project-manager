import { GetProjects } from "../Context/ProjectContext";
import { GetOverlay } from "../Context/OverlayContext";
import ProjectName from "./ProjectName";
import ProjectDescription from "./ProjectDescription";
import Button from "./ui/Button";
import { Trash } from "./Icons";

let ProjectDetails = () => {
  let { currentProject, editProject } = GetProjects();
  let { openConfirmModal } = GetOverlay();

  return (
    <div className="project-details flex items-start justify-between gap-3 max-sm:flex-col max-sm:items-center max-sm:text-center">
      <div className="name_desc flex w-full max-w-[750px] flex-1 flex-col justify-between gap-3 max-sm:items-center">
        <ProjectName editProject={editProject} value={currentProject.name} />
        <ProjectDescription
          editProject={editProject}
          value={currentProject.desc}
        />
      </div>
      <Button
        dark
        varient="danger"
        onClick={openConfirmModal}
        className="max-sm:rounded-full max-sm:px-10"
      >
        <Trash inher />
        Delete
      </Button>
    </div>
  );
};

export default ProjectDetails;
