import { useState } from "react";
import { createPortal } from "react-dom";
import AddTaskModal from "../components/AddTaskModal";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const tasks = [
    { id: 1, name: "Task One", status: "Pending", deadline: "2024-06-15" },
    { id: 2, name: "Task Two", status: "Completed", deadline: " 2024-06-10" },
    {
      id: 3,
      name: "Task Three",
      status: "In Progress",
      deadline: "2024-06-20",
    },
  ];

  return (
    <div className="w-full md:w-[calc(100%-150px)] lg:w-[calc(100%-250px)] flex flex-col items-center justify-start h-screen py-4 px-8">
      <Link to="/" className="w-full flex items-start gap-2">
        <IoArrowBackCircle className="size-6 text-blue-600" />
        <span>Back Home</span>
      </Link>
      <div className="w-full p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
        <button
          onClick={() => setShowModal((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700  mb-4 cursor-pointer hover:scale-102 transition-all duration-300"
        >
          Add Task
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table table-zebra font-abz">
          <thead>
            <tr>
              <th className="text-center whitespace-nowrap">ID</th>
              <th className="text-center whitespace-nowrap">Task Name</th>
              <th className="text-center whitespace-nowrap">Status</th>
              <th className="text-center whitespace-nowrap">Deadline</th>
              <th className="text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="text-center">{task.id}</td>
                <td className="text-center whitespace-nowrap">{task.name}</td>
                <td
                  className="text-center whitespace-nowrap"
                >
                  <button className={`rounded-md py-1 px-1.5 font-medium ${
                    task.status.toLocaleLowerCase() === "pending"
                      ? "bg-gray-300 text-gray-950"
                      : task.status.toLocaleLowerCase() === "in progress"
                      ? "bg-amber-400 text-amber-950"
                      : "bg-green-400 text-green-950"
                  }`}>{task.status}</button>
                </td>
                <td className="text-center whitespace-nowrap">
                  {task.deadline}
                </td>
                <td className="text-center">
                  <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal &&
        createPortal(
          <AddTaskModal setShowModal={setShowModal} />,
          document.body
        )}
    </div>
  );
};

export default Tasks;
