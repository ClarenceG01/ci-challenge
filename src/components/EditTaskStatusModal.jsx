import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditTaskStatusModal = ({ setShowModal, task, updateTasks }) => {
  const { register, handleSubmit } = useForm();
  const statusOptions = ["pending", "in-progress", "completed"];
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: data.status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      return response.json();
    },
    onSuccess: () => {
      successToast("Task status updated successfully", "update-task-status-s");
      queryClient.invalidateQueries(["tasks"]); // 🔥 refetch all tasks
      setShowModal(false);
    },
    onError: () => {
      errorToast("Failed to update task status", "update-task-status-e");
    },
  });
  const onSubmit = (data) => {
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
          Edit Task Status
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Task Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter task name"
              defaultValue={task.title}
              readOnly
            />
          </div>
          {/* status dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Status</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              {...register("status", { required: true })}
            >
              <option value={task.status}>{task.status}</option>
              {statusOptions
                .filter((status) => status !== task.status)
                .map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-102 transition-all duration-300"
          >
            Edit Task Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskStatusModal;
