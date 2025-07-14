import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../utils/toast";
import { useMutation } from "@tanstack/react-query";

const addTask = async (data) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
const AddTaskModal = ({ setShowModal, users, updateTasks }) => {
  const { register, handleSubmit } = useForm();
  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      successToast("Task added successfully", "add-task-s");
      updateTasks();
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    },
    onError: () => {
      errorToast("Failed to add task", "add-task-e");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };
    
 

  return (
    <div className="fixed inset-0 flex  justify-center bg-slate-900/90 text-black">
      <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-[400px] h-fit mt-5 md:mt-10 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2"
        >
          <IoMdClose className="size-6" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center font-abz">
          Add Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Task Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter task name"
              {...register("title", { required: true })}
            />
          </div>
          {/* status dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Status</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              {...register("status", { required: true })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {/* assign user */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Assign User</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              {...register("userId", { required: true })}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Deadline</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter deadline"
              {...register("deadline", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-102 transition-all duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
