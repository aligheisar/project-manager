import Providers from "./Context/Providers";
import OverlayRenderer from "./Components/Renderer/OverlayRenderer";
import App from "./App";

let Root = () => {
  return (
    <Providers>
      <OverlayRenderer />
      <App />
    </Providers>
  );
};

export default Root;
