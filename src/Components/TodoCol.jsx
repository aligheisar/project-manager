import { GetProjects } from "../Context/ProjectContext";
import Todo from "./Todo";

let TodoCol = ({ name, line, todos }) => {
  let { deleteTodo, moveTodo } = GetProjects();

  let handleDrop = (index) => {
    console.log(index);
  };

  return (
    <section className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-md">
      <label
        className={`${
          line ? "line-through" : ""
        } bg-primary py-2 text-center text-2xl font-semibold text-background-color transition-colors`}
      >
        {name}
      </label>
      <section className="custom-scroll flex min-h-14 flex-1 flex-col gap-1 overflow-y-auto bg-surface px-2 py-3 transition-colors">
        {todos?.map((i, index) => (
          <Todo
            key={i.id}
            body={i.body}
            onDelete={() => deleteTodo(name, i.id)}
            drop={() => handleDrop(index)}
          />
        ))}
      </section>
    </section>
  );
};

export default TodoCol;
