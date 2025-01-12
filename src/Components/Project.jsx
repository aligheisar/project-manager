import ProjectDetails from "./ProjectDetails";
import AddTodo from "./AddTodo";
import Todos from "./Todos";
import NoProject from "./NoProject";
import { GetProjects } from "../Context/ProjectContext";

let Project = () => {
  let { getCurrentProject, projectsLength } = GetProjects();
  let currentProj = getCurrentProject();
  return (
    <section className="project-container short-wide-ed:bg-black custom-scroll mx-auto flex h-full w-3/4 flex-col overflow-x-hidden max-lg:w-full">
      {currentProj ? (
        <>
          <section className="todo_details-container flex flex-col gap-6 px-7 py-11 pb-4 max-sm:px-4 max-sm:py-6">
            <ProjectDetails />
            <AddTodo />
          </section>
          <Todos todos={currentProj.todos} />
        </>
      ) : (
        projectsLength === 0 && <NoProject />
      )}
    </section>
  );
};

export default Project;
