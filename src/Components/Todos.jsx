import TodoCol from "./TodoCol";

let Todos = ({ todos }) => {
  let { noStatus, inProgress, done } = todos;
  return (
    <section className="todos-container custom-scroll flex flex-1 flex-col gap-3 pb-6 max-sm:pb-3 sm:overflow-y-hidden">
      <section className="todo-col-container custom-scroll mx-6 flex flex-1 gap-2 overflow-x-auto rounded-md pb-1 max-vsm:mx-2">
        <TodoCol name="no status" todos={noStatus} />
        <TodoCol name="in progress" todos={inProgress} />
        <TodoCol line name="done" todos={done} />
      </section>
    </section>
  );
};

export default Todos;
