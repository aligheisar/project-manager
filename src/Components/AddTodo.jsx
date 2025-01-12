import Button from "./ui/Button";
import Input from "./ui/Input";

let AddTodo = () => {
  return (
    <section className="flex max-w-[390px] gap-1 max-sm:w-full max-sm:max-w-[320px] max-sm:flex-col max-sm:self-center">
      <Input placeholder="To-do" />
      <Button className="px-6">Add</Button>
    </section>
  );
};

export default AddTodo;
