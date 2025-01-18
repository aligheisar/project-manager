import { useRef } from "react";
import { GetProjects } from "../Context/ProjectContext.jsx";
import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";

let AddTodo = () => {
  let { addTodo } = GetProjects();

  let input = useRef(null);

  let handleAddTodo = () => {
    let { value } = input.current;
    if (!value.trim()) {
      input.current.value = "";
      input.current.focus();
      return;
    }
    addTodo(value.trim())
    input.current.value = "";
  };
  return (
    <section className="flex max-w-[390px] gap-1 max-sm:w-full max-sm:max-w-[320px] max-sm:flex-col max-sm:self-center max-vsm:max-w-none">
      <Input
        ref={input}
        onKeyDown={(e) => (e.keyCode === 13 ? handleAddTodo() : null)}
        placeholder="To-do"
        varient="outlined"
      />
      <Button onClick={handleAddTodo} varient="outlined">
        Add
      </Button>
    </section>
  );
};

export default AddTodo;
