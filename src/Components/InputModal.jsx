import { useCallback, useEffect, useRef, useState } from "react";

let InputModal = ({ onClose, onOpen, onAccept }) => {
  let [isOpen, setIsOpen] = useState(true);
  let [data, setData] = useState({ name: "", desc: "" });

  let backdrop = useRef(null);
  let input = useRef(null);

  let closeModal = useCallback(
    (acc) => {
      let transtionEnd = () => {
        let newData = { name: data.name.trim(), desc: data.desc.trim() };
        if (acc) onAccept(newData);
        setData({ name: "", desc: "" });
        setIsOpen(false);
      };
      backdrop.current.classList.remove("active");
      setTimeout(() => {
        transtionEnd();
      }, 200);
    },
    [onAccept, data],
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

  useEffect(() => {
    input?.current?.focus();
    if (!isOpen) {
      onClose?.();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    let clickFunc = (e) => {
      if (
        e.target.className.includes("backdrop") ||
        e.target.className.includes("close-btn") ||
        e.target.className.includes("cancel-btn")
      ) {
        closeModal();
      }
    };
    let keypressFunc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    onOpen?.();
    backdrop?.current?.classList.add("active");
    document.addEventListener("click", clickFunc);
    document.addEventListener("keydown", keypressFunc);
    return () => {
      document.removeEventListener("click", clickFunc);
      document.removeEventListener("keydown", keypressFunc);
    };
  }, [onClose, onOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdrop}
      className="backdrop fixed left-0 top-0 z-[60] h-dvh w-dvw bg-transparent transition-color-filter"
    >
      <section className="modal fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-md bg-gray-200/85 px-4 py-4 pt-3 shadow-lg transition-all max-vsm:gap-[6px] max-vsm:px-2 max-vsm:py-3">
        <section className="flex w-full items-center justify-between text-gray-900 max-vsm:justify-center">
          <h2 className="text-lg max-vsm:text-base">Add new Project</h2>
          <span className="close-btn flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] transition-colors duration-200 hover:bg-gray-200 max-vsm:hidden">
            &#10006;
          </span>
        </section>
        <input
          ref={input}
          type="text"
          name="name"
          placeholder="Project Name"
          value={data.name}
          onChange={handleDataChange}
          onKeyDown={(e) => (e.keyCode === 13 ? handleAccept() : null)}
          className="w-[270px] border-2 border-gray-400 bg-gray-100 px-2 py-[6px] outline-none transition-colors placeholder:transition-colors placeholder:duration-100 focus-within:border-gray-600 focus-within:placeholder:text-gray-700 max-vsm:text-sm"
        />
        <textarea
          name="desc"
          placeholder="Enter description (optional)"
          value={data.desc}
          onChange={handleDataChange}
          onKeyDown={(e) =>
            e.keyCode === 13 && e.ctrlKey ? handleAccept() : null
          }
          className="custom-scroll-area h-20 w-full resize-none rounded-[4px] border-2 border-gray-400 px-1 py-1 text-sm text-gray-700 outline-none focus-within:border-gray-600 max-vsm:hidden"
        ></textarea>
        <section className="flex w-full items-center gap-1 max-vsm:flex-col-reverse">
          <button className="cancel-btn w-full rounded-[4px] border-gray-800 bg-gray-100 bg-gray-800/20 bg-none px-3 py-1 text-gray-800">
            Cancel
          </button>
          <button
            onClick={handleAccept}
            className="w-full rounded-[4px] bg-gray-700 px-3 py-1 text-gray-200"
          >
            Add
          </button>
        </section>
      </section>
    </div>
  );
};

export default InputModal;
