import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

let projectContext = createContext();

export let GetProjects = () => useContext(projectContext);

export default function ProjectProvider({ children }) {
  let [projects, setProjects] = useState([
    {
      id: uuid(),
      name: "my-new",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est mollitia odio ad quis eaque iusto nesciunt perspiciatis ipsam tenetur vel quasi natus sint exercitationem, vero enim pariatur! Doloremque molestiae aspernatur architecto sint harum error rem nesciunt possimus repellendus molestias fuga quisquam veritatis eos, in libero fugit quoloribus, tenetur reprehenderit unde obcaecati maxime illo in modi, repellendus delectus.",
      createAt: new Date().toLocaleString(),
      todos: {
        noStatus: [
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
        ],
        inProgress: [],
        done: [],
      },
    },
  ]);
  let [currentProjectId, setCurrentProjectId] = useState(
    () => projects?.[0]?.id ?? null,
  );

  let firstProjectId = projects?.[0]?.id;
  let projectsLength = projects.length;
  let currentProject = projects.find((i) => i.id === currentProjectId) || null;
  let currentProjectIndex = projects.findIndex(
    (i) => i.id === currentProjectId,
  );

  useEffect(() => {
    setCurrentProjectId(firstProjectId);
  }, [firstProjectId, projectsLength]);

  let createProject = ({ name, desc = "" }) => {
    setProjects((prevState) => [
      {
        id: uuid(),
        name,
        desc,
        createAt: new Date().toLocaleString(),
        todos: {
          noStatus: [],
          inProgress: [],
          done: [],
        },
      },
      ...prevState,
    ]);
  };

  let deleteProject = () => {
    setProjects((prevState) =>
      prevState.filter((i) => i.id !== currentProjectId),
    );
  };

  let editProject = ({ elem, value }) => {
    setProjects((prevState) =>
      prevState.map((i) =>
        i.id === currentProjectId ? { ...i, [elem]: value } : i,
      ),
    );
  };

  let switchProjectByIndex = (index) => {
    if (index < projectsLength) setCurrentProjectId(projects?.[index]?.id);
  };

  let value = {
    projects,
    projectsLength,
    currentProject,
    currentProjectId,
    currentProjectIndex,
    switchProjectByIndex,
    setCurrentProject: setCurrentProjectId,
    createProject,
    deleteProject,
    editProject,
  };
  return (
    <projectContext.Provider value={value}>{children}</projectContext.Provider>
  );
}
