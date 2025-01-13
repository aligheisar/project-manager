import AppProvider from "./Context/AppProvider";
import SettingProvider from "./Context/SettingContext";
import ThemeProvider from "./Context/ThemeContext";
import OverlayRenderer from "./Components/Renderer/OverlayRenderer";
import App from "./App";

let Root = () => {
  return (
    <AppProvider>
      <SettingProvider>
        <ThemeProvider>
          <OverlayRenderer />
          <App />
        </ThemeProvider>
      </SettingProvider>
    </AppProvider>
  );
};

export default Root;
