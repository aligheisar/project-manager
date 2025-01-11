import Sidebar from "./Components/Sidebar";
import Project from "./Components/Project";
import ContextProvider from "./Context/Context";

let App = () => {
  return (
    <main className="flex h-dvh items-center bg-gray-900">
      <ContextProvider>
        <Sidebar />
        <Project />
      </ContextProvider>
    </main>
  );
};
export default App;
