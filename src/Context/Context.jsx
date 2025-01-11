import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";
import InputModal from "../Components/InputModal";
import ProjectSwitcher from "../Components/ProjectSwitcher";
import ConfirmModal from "../Components/ConfirmModal";

let context = createContext();

export let GetContext = () => useContext(context);

export default function ContextProvider({ children }) {
  let [data, setData] = useState([
    {
      id: uuid(),
      name: "my-new",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est mollitia odio ad quis eaque iusto nesciunt perspiciatis ipsam tenetur vel quasi natus sint exercitationem, vero enim pariatur! Doloremque molestiae aspernatur architecto sint harum error rem nesciunt possimus repellendus molestias fuga quisquam veritatis eos, in libero fugit quas iste dolor eligendi ipsum natus dicta earum voluptatibus a! Perferendis consectetur sunt rem exercitationem, quod aperiam labore! Distinctio rerum sint porro inventore, ducimus, deserunt eveniet aliquid maiores, architecto temporibus velit dicta provident fuga quisquam minus eius nemo unde fugit? Deleniti voluptatibus sit doloribus, tenetur reprehenderit unde obcaecati maxime illo in modi, repellendus delectus.",
      todos: {
        noStatus: [
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
          { id: uuid(), body: "klsdjsk" },
        ],
        inProgress: [],
        done: [],
      },
    },
  ]);
  let [currentProj, setCurrentProj] = useState(() => data[0]?.id || undefined);
  let [newProjectModal, setNewProjectModal] = useState(false);
  let [projectSwitcher, setProjectSwitcher] = useState(false);
  let [confirmModal, setConfirmModal] = useState(false);

  let dataLen = data.length;

  useEffect(() => {
    let keydownFunc = (e) => {
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        setNewProjectModal(true);
      } else if (e.shiftKey && e.key === "Tab") {
        e.preventDefault();
        if (projectSwitcher) return;
        setProjectSwitcher(true);
      } else if (e.key === "d" && e.ctrlKey) {
        e.preventDefault();
        setConfirmModal(true);
      }
    };

    document.addEventListener("keydown", keydownFunc);
    return () => {
      document.removeEventListener("keydown", keydownFunc);
    };
  }, [projectSwitcher]);

  useEffect(() => {
    setCurrentProj(data?.[0]?.id);
  }, [data?.[0]?.id, dataLen]);

  let getProjects = () => {
    return data.map((d) => {
      let { id, name, desc } = d;
      return { id, name, desc };
    });
  };

  let makeNewProject = ({ name, desc = "" }) => {
    setData((prevState) => [
      {
        id: uuid(),
        name: name,
        desc,
        todos: {
          noStatus: [],
          inProgress: [],
          done: [],
        },
      },
      ...prevState,
    ]);
  };

  let deleteProj = () => {
    setData((prevState) => prevState.filter((i) => i.id !== currentProj));
  };

  let getCurrentProj = () => {
    return data.find((i) => i.id === currentProj) || undefined;
  };

  let renameProj = ({ elem, value }) => {
    setData((prevState) =>
      prevState.map((i) =>
        i.id === currentProj
          ? elem === "name"
            ? { ...i, name: value }
            : { ...i, desc: value }
          : i,
      ),
    );
  };

  let openConfirmModal = () => {
    setConfirmModal(true);
  };

  let openInputModal = () => {
    setNewProjectModal(true);
  };

  let closeSwitcher = (index) => {
    if (index < data.length) setCurrentProj(data[index]?.id);
    setProjectSwitcher(false);
  };

  let findCurrentIndex = () => {
    return data.findIndex((i) => i.id === currentProj);
  };

  let value = {
    getProjects,
    setCurrentProj,
    getCurrentProj,
    currentProj,
    makeNewProject,
    openConfirmModal,
    dataLen,
    renameProj,
    openInputModal,
  };
  return (
    <context.Provider value={value}>
      {newProjectModal &&
        createPortal(
          <InputModal
            onClose={() => setNewProjectModal(false)}
            onAccept={makeNewProject}
          />,
          document.body,
        )}
      {projectSwitcher &&
        createPortal(
          <ProjectSwitcher
            projects={data}
            findCurrent={findCurrentIndex}
            close={closeSwitcher}
          />,
          document.body,
        )}
      {confirmModal &&
        createPortal(
          <ConfirmModal
            onClose={() => setConfirmModal(false)}
            onAccept={deleteProj}
          />,
          document.body,
        )}
      {children}
    </context.Provider>
  );
}
