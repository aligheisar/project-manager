import { createPortal } from "react-dom";
import { GetOverlay } from "../../Context/OverlayContext";
import InputModal from "../InputModal";
import ConfirmModal from "../ConfirmModal";
import ProjectSwitcher from "../ProjectSwitcher";
import useKeybordShortcuts from "../../hooks/useKeybordShortcuts";
import { GetProjects } from "../../Context/ProjectContext";

let OverlayRenderer = () => {
  let { overlay, openOverlay, closeOverlay } = GetOverlay();
  let {
    projects,
    createProject,
    deleteProject,
    getProjectIndex,
    switchProjectByIndex,
  } = GetProjects();

  let body = document.body;

  useKeybordShortcuts({
    "Ctrl+e": {
      func: () => openOverlay("InputModal", { onAccept: createProject }),
      prevent: true,
    },
    "Ctrl+d": {
      func: () => openOverlay("ConfirmModal", { onAccept: deleteProject }),
      prevent: true,
    },
    "Shift+Tab": {
      func: (e) => {
        if (overlay.type === "ProjectSwitcher") return;
        e.preventDefault();
        e.stopPropagation();
        openOverlay("ProjectSwitcher", {
          projects,
          switchProjectByIndex,
          getProjectIndex,
        });
      },
    },
  });

  return (
    <>
      {overlay.type === "InputModal" &&
        createPortal(
          <InputModal onClose={closeOverlay} {...overlay.props} />,
          body,
        )}
      {projects.length > 0 &&
        overlay.type === "ConfirmModal" &&
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
