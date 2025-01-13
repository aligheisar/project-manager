import Sidebar from "./Components/Sidebar";
import Project from "./Components/Project";

let App = () => {
  return (
    <main className="bg-surface flex h-dvh items-center">
      <Sidebar />
      <Project />
    </main>
  );
};
export default App;
