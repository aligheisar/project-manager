import Sidebar from "./Components/Sidebar";
import Project from "./Components/Project";
import Button from "./Components/ui/Button.tsx";
import Input from "./Components/ui/Input.tsx";

let App = () => {
  return (
    <main className="flex h-dvh items-center bg-gray-900">
      <div className="bg-background-color mx-auto p-8">
        {/* <Button varient="tonal">asdfj</Button> */}
        <Input placeholder="Enter To-do" varient="" />
      </div>
      {/* <Sidebar /> */}
      {/* <Project /> */}
    </main>
  );
};
export default App;
