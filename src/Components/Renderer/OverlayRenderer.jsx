import { createPortal } from "react-dom";
import { GetOverlay } from "../../Context/OverlayContext";
import InputModal from "../InputModal";
import ConfirmModal from "../ConfirmModal";
import ProjectSwitcher from "../ProjectSwitcher";

let OverlayRenderer = () => {
  let { overlay, onClose } = GetOverlay();

  let body = document.body;

  return (
    <>
      {overlay.type === "InputModal" &&
        createPortal(<InputModal onClose={onClose} {...overlay.props} />, body)}
      {overlay.type === "ConfirmModal" &&
        createPortal(
          <ConfirmModal onClose={onClose} {...overlay.props} />,
          body,
        )}
      {overlay.type === "ProjectSwitcher" &&
        createPortal(
          <ProjectSwitcher onClose={onClose} {...overlay.props} />,
          body,
        )}
    </>
  );
};

export default OverlayRenderer;
