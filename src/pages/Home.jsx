import { Link } from "react-router-dom";
import { FaUsers, FaTasks } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Taskyz</h1>
      <p className="text-lg mb-6">Your task management solution</p>
      <div className="flex space-x-4">
        <Link
          to="/users"
          className="flex flex-col items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaUsers className="mb-1 md:hidden size-6" />
          Users
        </Link>
        <Link
          to="/tasks"
          className="flex flex-col items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaTasks className="mb-1 md:hidden size-6" />
          Tasks
        </Link>
      </div>
    </div>
  );
};

export default Home;
