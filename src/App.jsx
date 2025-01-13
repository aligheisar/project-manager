import Sidebar from "./Components/Sidebar";
import Project from "./Components/Project";

let App = () => {
  return (
    <main className="flex h-dvh items-center bg-background-color">
      <Sidebar />
      <Project />
    </main>
  );
};
export default App;
