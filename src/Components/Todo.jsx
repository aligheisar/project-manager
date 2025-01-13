import { Trash } from "./Icons";

let Todo = ({ body }) => {
  return (
    <div
      draggable
      className="flex items-center rounded-[3px] bg-background-color px-2 py-2 text-text-color shadow-md"
    >
      <p className="flex-1 text-lg">{body}</p>
      <span className="flex cursor-pointer items-center rounded-sm bg-white/0 fill-muted p-1 align-middle transition-colors duration-200 hover:bg-white/30">
        <Trash inher />
      </span>
    </div>
  );
};

export default Todo;
