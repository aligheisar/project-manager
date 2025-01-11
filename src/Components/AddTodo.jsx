let AddTodo = () => {
  return (
    <section className="flex max-w-[390px] gap-1 max-sm:w-full max-sm:max-w-[320px] max-sm:flex-col max-sm:self-center">
      <input
        className="bg-gray-white flex-1 border-2 border-gray-600 px-2 py-1 shadow-md shadow-black/10 outline-none placeholder:transition-colors placeholder:duration-100 focus-within:placeholder:text-gray-700"
        type="text"
        placeholder="To-do"
      />
      <button className="rounded-[4px] bg-gray-200 px-6 py-1 font-medium text-gray-900">
        Add
      </button>
    </section>
  );
};

export default AddTodo;
