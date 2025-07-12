import { IoMdClose } from "react-icons/io";

const AddTaskModal = ({ setShowModal }) => {
  return (
    <div className="fixed inset-0 flex  justify-center bg-slate-900/90">
      <div className=" bg-white p-6 rounded shadow-lg w-[300px] md:w-[400px] h-fit mt-5 md:mt-10 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose className="size-6" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center font-abz">
          Add Task
        </h2>
        <form>
          <div className="mb-4">
            <label className="block font-medium mb-2">Task Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter task name"
            />
          </div>
          {/* status dropdown */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Status</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {/* assign user */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Assign User</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Deadline</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter deadline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-102 transition-all duration-300"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
