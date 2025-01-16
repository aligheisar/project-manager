import { useCallback, useEffect, useRef, useState } from "react";
import useKeybordShortcuts from "../hooks/useKeybordShortcuts";
import Backdrop from "./Backdrop.jsx";
import Input from "./ui/Input.tsx";
import Button from "./ui/Button.tsx";
import TextArea from "./ui/TextArea.tsx";

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
    27: { func: () => closeModal() },
  });

  if (!isOpen) return null;

  return (
    <Backdrop
      ref={backdrop}
      onClose={closeModal}
      className="z-[60] bg-transparent transition-color-filter"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="modal fixed left-1/2 top-1/2 flex w-full max-w-[19rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-xl bg-background-color px-3 pb-3 pt-[14px] shadow-lg transition-all max-vsm:max-w-64 max-vsm:gap-[14px]"
      >
        <section className="flex w-full items-center justify-between text-text-color max-vsm:justify-center">
          <h2 className="text-lg">Add new Project</h2>
          <span
            onClick={() => closeModal()}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-colors duration-200 hover:bg-text-color/10 max-vsm:hidden"
          >
            &#10006;
          </span>
        </section>
        <section className="flex w-full flex-col gap-[6px]">
          <Input
            ref={input}
            name="name"
            placeholder="Project Name"
            value={data.name}
            onChange={handleDataChange}
            onKeyDown={handleInputKeyDown}
            varient="outlined"
            className="w-full"
          />
          <TextArea
            name="desc"
            placeholder="Enter description (optional)"
            value={data.desc}
            onChange={handleDataChange}
            onKeyDown={handleInputKeyDown}
            varient="outlined"
            className="max-vsm:hidden"
          ></TextArea>
        </section>
        <section className="flex w-full items-center gap-1 max-vsm:flex-col-reverse">
          <Button
            onClick={() => closeModal()}
            varient="tonal"
            className="w-full"
          >
            Cancel
          </Button>
          <Button onClick={handleAccept} className="w-full">
            Add
          </Button>
        </section>
      </section>
    </Backdrop>
  );
};

export default InputModal;
