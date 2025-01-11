import { GetContext } from "../Context/Context";

let NoProject = () => {
  let { openInputModal } = GetContext();

  return (
    <>
      <section className="no-project flex h-full flex-1 -translate-y-12 flex-col items-center justify-center gap-3 px-4 max-sm:text-center">
        <h1 className="text-5xl font-semibold text-gray-200 max-sm:text-4xl">
          You got no{" "}
          <span className="mt-2 inline-block drop-shadow-[0_8px_10px_rgba(200,200,200,.3)]">
            Project
          </span>
        </h1>
        <p className="mb-6 text-2xl font-light text-gray-400 max-sm:mb-2 max-sm:text-xl">
          Make one
        </p>
        <button
          onClick={openInputModal}
          className="rounded-full bg-gray-200 px-12 py-2 text-lg font-semibold text-gray-950 shadow-lg shadow-gray-300/20 max-sm:px-6 max-sm:py-1 max-sm:text-base"
        >
          New Project
        </button>
      </section>
    </>
  );
};

export default NoProject;
