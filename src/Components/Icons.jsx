export let Trash = ({ size = 16, color = "black", inher }) => {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        d="M10 2L9 3L4 3L4 5L7 5L17 5L20 5L20 3L15 3L14 2L10 2 z M 5 7L5 20C5 21.1 5.9 22 7 22L17 22C18.1 22 19 21.1 19 20L19 7L5 7 z"
        fill={!inher ? color : null}
      />
    </svg>
  );
};
