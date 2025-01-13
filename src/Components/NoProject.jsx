import { GetOverlay } from "../Context/OverlayContext";
import Button from "./ui/Button.tsx";

let NoProject = () => {
  let { openInputModal } = GetOverlay();

  return (
    <>
      <section className="no-project flex h-full flex-1 -translate-y-12 flex-col items-center justify-center gap-3 px-4 max-sm:text-center">
        <h1 className="text-5xl font-semibold text-text-color max-sm:text-4xl">
          You got no{" "}
          <span className="mt-2 inline-block drop-shadow-[0_8px_10px_rgba(200,200,200,.3)]">
            Project
          </span>
        </h1>
        <p className="mb-6 text-2xl font-light text-muted max-sm:mb-2 max-sm:text-xl">
          Make one
        </p>
        <Button onClick={openInputModal} varient="outlined">
          New Project
        </Button>
      </section>
    </>
  );
};

export default NoProject;
