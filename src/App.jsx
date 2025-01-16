import Sidebar from "./Components/Sidebar";
import Project from "./Components/Project";

let App = () => {
  return (
    <main className="flex h-dvh items-center bg-background-color transition-colors">
      <Sidebar />
      <Project />
    </main>
  );
};
export default App;
