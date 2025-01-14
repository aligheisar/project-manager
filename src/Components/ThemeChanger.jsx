import { GetTheme } from "../Context/ThemeContext";

let ThemeChanger = () => {
  let { theme, changeTheme } = GetTheme();

  return (
    <>
      {" "}
      <h1>{theme}</h1>
      <section className="flex gap-1">
        <button
          className="flex-1 rounded-sm bg-lime-200"
          onClick={() => changeTheme("light")}
        >
          Light
        </button>
        <button
          className="flex-1 rounded-sm bg-lime-200"
          onClick={() => changeTheme("dark")}
        >
          Dark
        </button>
        <button
          className="flex-1 rounded-sm bg-lime-200"
          onClick={() => changeTheme("system")}
        >
          System
        </button>
      </section>
    </>
  );
};

export default ThemeChanger;
