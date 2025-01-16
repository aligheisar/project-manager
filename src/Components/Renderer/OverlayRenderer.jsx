import { createPortal } from "react-dom";
import { GetOverlay } from "../../Context/OverlayContext";
import InputModal from "../InputModal";
import ConfirmModal from "../ConfirmModal";
import ProjectSwitcher from "../ProjectSwitcher";
import useKeybordShortcuts from "../../hooks/useKeybordShortcuts";
import { GetProjects } from "../../Context/ProjectContext";

let OverlayRenderer = () => {
  let {
    overlay,
    openInputModal,
    openConfirmModal,
    openProjectSwitcher,
    closeOverlay,
  } = GetOverlay();
  let { projectsLength } = GetProjects();

  let body = document.body;

  useKeybordShortcuts({
    "Ctrl+69": {
      func: () => openInputModal(),
      prevent: true,
    },
    "Ctrl+68": {
      func: () => openConfirmModal(),
      prevent: true,
    },
    "Shift+9": {
      func: (e) => {
        if (overlay.type === "ProjectSwitcher") return;
        e.preventDefault();
        e.stopPropagation();
        openProjectSwitcher();
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
      {projectsLength > 0 &&
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
