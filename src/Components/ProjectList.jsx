import { GetProjects } from "../Context/ProjectContext";
import ProjectItem from "./ProjectItem";

let ProjectList = ({ closeOnSmallView }) => {
  let { projects, projectsLength, setCurrentProject, currentProjectId } =
    GetProjects();

  let switchProject = (id) => {
    setCurrentProject(id);
    closeOnSmallView();
  };
  return projects && projectsLength > 0 ? (
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
    <NoProject />
  );
};

export default ProjectList;

let NoProject = () => {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <p className="-translate-y-16 text-lg text-text-color">No Project</p>
    </section>
  );
};
