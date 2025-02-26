import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Sun, Moon } from "lucide-react";
import { useDarkMode } from "../../context/DarkmodeContext.jsx";

export const TodoList = () => {
  const navigate = useNavigate();
 

  const [list, setList] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    setList(storedTasks);
  }, []);

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);

    setList(updatedList);

    localStorage.setItem("tasks", JSON.stringify(updatedList));
  };

  return (
    <div className="m-12">
      <div className="flex justify-between gap-3 px-2 py-3"></div>
      <p className="flex justify-center font-bold lg:text-3xl">TodoList App</p>
      <button
        className=" cursor-pointer flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
        onClick={() => {
          navigate("/add");
        }}
      >
        <Plus size={18} />
        Create New Task 
      </button>

      <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {list.map((task) => { 
          return (
            <Card
              id={task.id}
              key={task.id}
              heading={task.heading}
              description={task.description}
              createdAt={task.createdAt}
              onDelete={handleDelete}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};
