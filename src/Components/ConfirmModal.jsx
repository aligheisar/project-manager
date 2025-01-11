import { useCallback, useEffect, useRef, useState } from "react";

let ConfirmModal = ({ onClose, onOpen, onAccept }) => {
  let [isOpen, setIsOpen] = useState(true);

  let backdrop = useRef(null);

  let closeModal = useCallback(
    ({ remove }) => {
      let transtionEnd = () => {
        if (remove) onAccept();
        setIsOpen(false);
        onClose?.();
      };

      backdrop.current.classList.remove("active");
      setTimeout(() => {
        transtionEnd();
      }, 200);
    },
    [onAccept, onClose],
  );
  useEffect(() => {
    let keypressFunc = (e) => {
      if (e.key === "Escape") closeModal({ remove: false });
      if (e.keyCode === 13) closeModal({ remove: true });
    };

    onOpen?.();
    backdrop?.current?.classList.add("active");
    document.addEventListener("keydown", keypressFunc);
    return () => {
      document.removeEventListener("keydown", keypressFunc);
    };
  }, [onClose, onOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdrop}
      onClick={() => closeModal({ remove: false })}
      className="backdrop fixed left-0 top-0 z-[60] h-dvh w-dvw bg-transparent transition-color-filter"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="modal fixed left-1/2 top-1/2 flex w-full max-w-80 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-md bg-gray-200/85 px-2 py-2 pt-4 shadow-lg transition-all duration-200 max-vsm:max-w-64"
      >
        <h2 className="text-2xl font-semibold text-gray-800 max-vsm:text-xl">
          Are you sure ?
        </h2>
        <p className="max-w-[70%] text-center text-sm text-gray-600 max-vsm:max-w-[90%]">
          if you were confirm this popUp the project will delete.
        </p>
        <section className="flex w-full flex-col gap-1">
          <button
            onClick={() => closeModal({ remove: true })}
            className="rounded-[4px] bg-red-700/70 py-[6px] text-gray-200"
          >
            Confirm
          </button>
          <button
            onClick={() => closeModal({ remove: false })}
            className="rounded-[4px] bg-gray-400/80 py-[6px] text-gray-800"
          >
            Cancel
          </button>
        </section>
      </section>
    </div>
  );
};

export default ConfirmModal;
