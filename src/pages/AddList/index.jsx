
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { PlusCircle, XCircle } from "lucide-react";

export const AddTodoList = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    heading: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // get "tasks" dari local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // task baru
    const newTask = {
      id: Date.now(),
      heading: task.heading,
      description: task.description,
      createdAt: Date.now(),
    };

    // Update task dengan array
    const updatedTasks = [...tasks, newTask];

    // save update
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // navigate ke todolist
    navigate("/");
  };

  const isFormValid =
    task.heading.trim() !== "" && task.description.trim() !== "";

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">✨ Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Heading Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            name="heading"
            value={task.heading}
            onChange={handleInputChange}
            placeholder="Enter task title..."
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            placeholder="Enter task details..."
            rows="4"
            className="w-full resize-none rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className=" cursor-pointer flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2 text-white transition-all hover:bg-red-600 active:scale-95"
          >
            <XCircle size={18} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={` flex items-center gap-2 rounded-lg px-5 py-2 text-white transition-all active:scale-95 ${
              isFormValid
                ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                : "cursor-not-allowed bg-gray-400"
            }`}
          >
            <PlusCircle size={18} />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
