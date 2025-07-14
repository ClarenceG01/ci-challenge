import { useState } from "react";
import { createPortal } from "react-dom";
import AddTaskModal from "../components/AddTaskModal";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("/api/users", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!response.ok) {
    errorToast("Failed to fetch users", "fetch-users-e");
    return [];
  }

  return await response.json();
};
const fetchAllTasks = async () => {
  const response = await fetch("/api/tasks", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (!response.ok) {
    errorToast("Failed to fetch tasks", "fetch-tasks-e");
    return [];
  }
  return await response.json();
};
const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const { data: tasksDetails, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchAllTasks,
  });
  const { tasks } = tasksDetails || { tasks: [] };
  let id = 0;
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
              <th className="text-center whitespace-nowrap">Assigned User</th>
              <th className="text-center whitespace-nowrap">Deadline</th>
              <th className="text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks?.map((task) => (
                <tr key={task._id}>
                  <td className="text-center">{id++}</td>
                  <td className="text-center whitespace-nowrap">
                    {task.title}
                  </td>
                  <td className="text-center whitespace-nowrap">
                    <button
                      className={`rounded-md py-1 px-1.5 font-medium ${
                        task.status.toLocaleLowerCase() === "pending"
                          ? "bg-gray-300 text-gray-950"
                          : task.status.toLocaleLowerCase() === "in progress"
                          ? "bg-amber-400 text-amber-950"
                          : "bg-green-400 text-green-950"
                      }`}
                    >
                      {task.status}
                    </button>
                  </td>
                  <td className="text-center whitespace-nowrap">
                    {task.username}
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal &&
        createPortal(
          <AddTaskModal
            setShowModal={setShowModal}
            users={users}
            updateTasks={refetch}
          />,
          document.body
        )}
    </div>
  );
};

export default Tasks;
