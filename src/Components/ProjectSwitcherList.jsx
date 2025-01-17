let ProjectSwitcherList = ({
  projects,
  close,
  activeItem,
  currentProjectIndex,
}) => {
  return projects.map((i, index) => (
    <div
      key={i.id}
      onClick={() => close(false, index)}
      className={`cursor-pointer rounded-sm bg-on-secondary/20 px-2 py-1 text-text-color hover:bg-on-secondary/25 ${index === activeItem ? `bg-on-secondary/35` : ""} ${
        index === currentProjectIndex
          ? "outline outline-2 outline-offset-1 outline-primary"
          : ""
      }`}
    >
      {i.name}
    </div>
  ));
};

export default ProjectSwitcherList;
