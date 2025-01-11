import AppProvider from "./Context/AppProvider";
import OverlayRenderer from "./Components/Renderer/OverlayRenderer";
import App from "./App";

let Root = () => {
  return (
    <AppProvider>
      <OverlayRenderer />
      <App />
    </AppProvider>
  );
};

export default Root;
