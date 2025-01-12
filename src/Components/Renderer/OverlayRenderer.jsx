import { createPortal } from "react-dom";
import { GetOverlay } from "../../Context/OverlayContext";
import InputModal from "../InputModal";
import ConfirmModal from "../ConfirmModal";
import ProjectSwitcher from "../ProjectSwitcher";
import useKeybordShortcuts from "../../hooks/useKeybordShortcuts";
import { GetProjects } from "../../Context/ProjectContext";

let OverlayRenderer = () => {
  let { overlay, openOverlay, closeOverlay } = GetOverlay();
  let { createProject, deleteProject } = GetProjects();

  let body = document.body;

  useKeybordShortcuts({
    "Ctrl+e": () => openOverlay("InputModal", { onAccept: createProject }),
    "Ctrl+d": () => openOverlay("ConfirmModal", { onAccept: deleteProject }),
  });

  return (
    <>
      {overlay.type === "InputModal" &&
        createPortal(
          <InputModal onClose={closeOverlay} {...overlay.props} />,
          body,
        )}
      {overlay.type === "ConfirmModal" &&
        createPortal(
          <ConfirmModal onClose={closeOverlay} {...overlay.props} />,
          body,
        )}
      {overlay.type === "ProjectSwitcher" &&
        createPortal(
          <ProjectSwitcher onClose={closeOverlay} {...overlay.props} />,
          body,
        )}
    </>
  );
};

export default OverlayRenderer;
