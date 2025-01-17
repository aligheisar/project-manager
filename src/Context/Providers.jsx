import ProjectProvider from "./ProjectContext";
import OverlayProvider from "./OverlayContext";
import SettingProvider from "./SettingContext";
import ThemeProvider from "./ThemeContext";

let Providers = ({ children }) => {
  return (
    <ProjectProvider>
      <SettingProvider>
        <ThemeProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </ThemeProvider>
      </SettingProvider>
    </ProjectProvider>
  );
};

export default Providers;
