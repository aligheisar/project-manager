import Todo from "./Todo";

let TodoCol = ({ name, line, todos }) => {
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
        {todos?.map((i) => (
          <Todo key={i.id} body={i.body} />
        ))}
      </section>
    </section>
  );
};

export default TodoCol;
