import { useCallback, useEffect, useRef, useState } from "react";
import useKeybordShortcuts from "../hooks/useKeybordShortcuts";
import Button from "./ui/Button.tsx";
import Backdrop from "./Backdrop.jsx";

let ConfirmModal = ({ onClose, onOpen, onAccept }) => {
  let [isOpen, setIsOpen] = useState(true);

  let backdrop = useRef(null);

  let closeModal = useCallback(
    (remove = false) => {
      let transtionEnd = () => {
        setIsOpen(false);
        onClose?.();
      };

      if (remove) onAccept();
      backdrop.current.classList.remove("active");
      setTimeout(() => {
        transtionEnd();
      }, 200);
    },
    [onAccept, onClose],
  );

  useKeybordShortcuts({
    27: { func: () => closeModal() },
    13: { func: () => closeModal(true) },
  });

  useEffect(() => {
    onOpen?.();
    setTimeout(() => backdrop?.current?.classList.add("active"));
  }, [onOpen]);

  if (!isOpen) return null;

  return (
    <Backdrop
      ref={backdrop}
      onClose={closeModal}
      className="z-[60] bg-transparent transition-color-filter"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="modal fixed left-1/2 top-1/2 flex w-full max-w-80 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[18px] rounded-xl bg-background-color px-3 pb-3 pt-6 shadow-lg transition-all duration-200 max-vsm:max-w-64"
      >
        <h2 className="text-2xl font-medium text-text-color max-vsm:text-xl">
          Are you sure ?
        </h2>
        <p className="max-w-[70%] text-center text-sm font-normal text-muted max-vsm:max-w-[90%]">
          if you were confirm this popUp the project will delete.
        </p>
        <section className="flex w-full flex-col gap-1">
          <Button
            onClick={() => closeModal(true)}
            varient="filled"
            className="bg-error/85 text-text-color hover:bg-error/90 active:bg-error/100"
          >
            Confirm
          </Button>
          <Button onClick={() => closeModal()} varient="tonal">
            Cancel
          </Button>
        </section>
      </section>
    </Backdrop>
  );
};

export default ConfirmModal;
