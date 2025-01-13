import { useCallback, useEffect, useRef, useState } from "react";
import useKeybordShortcuts from "../hooks/useKeybordShortcuts";
import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";

let InputModal = ({ onClose, onOpen, onAccept }) => {
  let [isOpen, setIsOpen] = useState(true);
  let [data, setData] = useState({ name: "", desc: "" });

  let backdrop = useRef(null);
  let input = useRef(null);

  let closeModal = useCallback(
    (accept = false) => {
      setData({ name: "", desc: "" });
      let transtionEnd = () => {
        let newData = { name: data.name.trim(), desc: data.desc.trim() };
        if (accept) onAccept(newData);
        setIsOpen(false);
        onClose?.();
      };
      backdrop.current.classList.remove("active");
      setTimeout(() => {
        transtionEnd();
      }, 200);
    },
    [data, onAccept, onClose],
  );

  let handleDataChange = (e) => {
    let { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  let handleAccept = () => {
    if (!data.name.trim()) {
      setData((prev) => ({ name: "", desc: prev.desc }));
      input.current.focus();
      return;
    }
    closeModal(true);
  };

  let handleInputKeyDown = (e) => {
    if (e.target.name === "name") {
      if (e.keyCode === 13) handleAccept();
    } else if (e.target.name === "desc") {
      if (e.keyCode === 13 && e.ctrlKey) handleAccept();
    }
  };

  useEffect(() => {
    onOpen?.();
    setTimeout(() => backdrop.current.classList.add("active"));
    input.current.focus();
  }, [onOpen]);

  useKeybordShortcuts({
    Escape: { func: () => closeModal() },
  });

  if (!isOpen) return null;

  return (
    <div
      ref={backdrop}
      onClick={() => closeModal()}
      className="fixed left-0 top-0 z-[60] h-dvh w-dvw bg-transparent transition-color-filter"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="modal fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-md bg-gray-200/85 px-4 py-4 pt-3 shadow-lg transition-all max-vsm:gap-[6px] max-vsm:px-2 max-vsm:py-3"
      >
        <section className="flex w-full items-center justify-between text-gray-900 max-vsm:justify-center">
          <h2 className="text-lg max-vsm:text-base">Add new Project</h2>
          <span
            onClick={() => closeModal()}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] transition-colors duration-200 hover:bg-gray-200 max-vsm:hidden"
          >
            &#10006;
          </span>
        </section>
        <Input
          ref={input}
          name="name"
          placeholder="Project Name"
          value={data.name}
          onChange={handleDataChange}
          onKeyDown={handleInputKeyDown}
          className="w-[270px]"
        />
        <textarea
          name="desc"
          placeholder="Enter description (optional)"
          value={data.desc}
          onChange={handleDataChange}
          onKeyDown={handleInputKeyDown}
          className="custom-scroll-area h-20 w-full resize-none rounded-[4px] border-2 border-gray-400 px-1 py-1 text-sm text-gray-700 outline-none focus-within:border-gray-600 max-vsm:hidden"
        ></textarea>
        <section className="flex w-full items-center gap-1 max-vsm:flex-col-reverse">
          <Button onClick={() => closeModal()} varient="dim" className="w-full">
            Cancel
          </Button>
          <Button varient="colored" onClick={handleAccept} className="w-full">
            Add
          </Button>
        </section>
      </section>
    </div>
  );
};

export default InputModal;
