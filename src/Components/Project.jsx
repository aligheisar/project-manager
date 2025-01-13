import ProjectDetails from "./ProjectDetails";
import AddTodo from "./AddTodo";
import Todos from "./Todos";
import NoProject from "./NoProject";
import { GetProjects } from "../Context/ProjectContext";

let Project = () => {
  let { currentProject, projectsLength } = GetProjects();
  return (
    <section className="project-container bg-primary custom-scroll mx-auto flex h-full w-3/4 flex-col overflow-x-hidden max-lg:w-full">
      {currentProject ? (
        <>
          <section className="todo_details-container flex flex-col gap-6 px-7 py-11 pb-4 max-sm:px-4 max-sm:py-6">
            <ProjectDetails />
            <AddTodo />
          </section>
          <Todos todos={currentProject.todos} />
        </>
      ) : (
        projectsLength === 0 && <NoProject />
      )}
    </section>
  );
};

export default Project;
