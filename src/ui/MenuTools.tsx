"use client";

const MenuTools = () => {
  return (
    <div className="-mb-2 p-2 pb-3 px-3 flex justify-center border rounded-t-lg border-gray-300">
      <div className="flex items-center ">
        <input
          type="checkbox"
          name="editor-mode"
          id="editor-mode"
          className="hidden peer"
        />
        <label
          htmlFor="editor-mode"
          className="peer-checked:bg-red-500 bg-blue-500 shadow-lg rounded cursor-pointer "
        >
          <div className="text-white px-4 py-2 rounded select-none text-2xl font-bold">
            +
          </div>
        </label>
      </div>
    </div>
  );
};

export default MenuTools;
