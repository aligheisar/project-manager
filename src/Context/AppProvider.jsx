import ProjectProvider from "./ProjectContext";
import OverlayProvider from "./OverlayContext";

let AppProvider = ({ children }) => {
  return (
    <ProjectProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </ProjectProvider>
  );
};

export default AppProvider;
