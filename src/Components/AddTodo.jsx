import Button from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";

let AddTodo = () => {
  return (
    <section className="flex max-w-[390px] gap-1 max-sm:w-full max-sm:max-w-[320px] max-sm:flex-col max-sm:self-center max-vsm:max-w-none">
      <Input placeholder="To-do" varient="outlined" />
      <Button varient="outlined">Add</Button>
    </section>
  );
};

export default AddTodo;
