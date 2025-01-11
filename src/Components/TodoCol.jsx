import Todo from "./Todo";

let TodoCol = ({ name, line, todos }) => {
  return (
    <section className="flex w-[300px] min-w-[200px] shrink-0 flex-col overflow-hidden rounded-md shadow-2xl">
      <label
        className={`${
          line ? "line-through" : ""
        } bg-gray-700 py-2 text-center text-2xl font-semibold text-gray-200`}
      >
        {name}
      </label>
      <section className="custom-scroll flex min-h-14 flex-1 flex-col gap-1 overflow-y-auto bg-gray-200/80 px-2 py-3">
        {todos?.map((i) => (
          <Todo key={i.id} body={i.body} />
        ))}
      </section>
    </section>
  );
};

export default TodoCol;
