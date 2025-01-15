import { forwardRef } from "react";
import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";
import { GetProjects } from "../Context/ProjectContext.jsx";

let AddProject = forwardRef(({ closeOnSmallView }, ref) => {
  let { createProject } = GetProjects();

  let handleAddNewProject = () => {
    let { value } = ref.current;

    if (!value.trim()) {
      ref.current.value = "";
      ref.current.focus();
      return;
    }
    createProject({ name: value });
    ref.current.value = "";
    closeOnSmallView();
  };

  let handleInputKeyDown = (e) => {
    if (e.keyCode === 13) handleAddNewProject();
  };

  return (
    <section className="flex flex-col gap-1">
      <Input
        ref={ref}
        type="text"
        placeholder="Project Name"
        onKeyDown={handleInputKeyDown}
      />
      <Button onClick={handleAddNewProject}>Add Project</Button>
    </section>
  );
});

export default AddProject;
