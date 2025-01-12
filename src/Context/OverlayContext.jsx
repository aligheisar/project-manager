import { createContext, useContext, useState } from "react";
import { GetProjects } from "./ProjectContext";

let overlayContext = createContext();

export let GetOverlay = () => useContext(overlayContext);

export default function OverlayProvider({ children }) {
  let {
    projects,
    createProject,
    deleteProject,
    currentProjectIndex,
    switchProjectByIndex,
  } = GetProjects();

  let [overlay, setOverlay] = useState({ type: null, props: {} });

  let openOverlay = (type, props = {}) => {
    setOverlay({ type, props });
  };

  let closeOverlay = () => {
    setOverlay({ type: null, props: {} });
  };

  let openInputModal = () => {
    openOverlay("InputModal", { onAccept: createProject });
  };

  let openConfirmModal = () => {
    openOverlay("ConfirmModal", { onAccept: deleteProject });
  };

  let openProjectSwitcher = () => {
    openOverlay("ProjectSwitcher", {
      projects,
      switchProjectByIndex,
      currentProjectIndex,
    });
  };

  let value = {
    overlay,
    closeOverlay,
    openInputModal,
    openConfirmModal,
    openProjectSwitcher,
  };
  return (
    <overlayContext.Provider value={value}>{children}</overlayContext.Provider>
  );
}
