import { Trash } from "./Icons";

let Todo = ({ body }) => {
  return (
    <div
      draggable
      className="flex items-center rounded-[3px] bg-gray-700/60 px-2 py-2 shadow-md"
    >
      <p className="flex-1 text-lg">{body}</p>
      <span className="flex cursor-pointer items-center rounded-sm bg-gray-200/0 p-1 align-middle transition-colors duration-200 hover:bg-gray-200/40">
        <Trash />
      </span>
    </div>
  );
};

export default Todo;
