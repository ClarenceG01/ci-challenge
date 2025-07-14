import { Link } from "react-router-dom";
import { FaUsers, FaTasks } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { MdOutlineLogout } from "react-icons/md";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full md:w-[calc(100%-150px)] lg:w-[calc(100%-250px)] flex flex-col items-center justify-center h-screen relative font-inter">
      {user && (
        <div className="w-full absolute top-0 right-0 p-4 flex items-center justify-between">
          <p className="font-abz text-lg">{user.username}</p>
          <div className="flex flex-col ">
            <MdOutlineLogout className="size-6 cursor-pointer" />
            <p>Logout</p>
          </div>
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">Welcome to Taskyz</h1>
      <p className="text-lg mb-6">Your task management solution</p>
      <div className="flex space-x-4">
        {user?.role === "admin" && (
          <Link
            to="/users"
            className="flex flex-col items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FaUsers className="mb-1 md:hidden size-6" />
            Users
          </Link>
        )}
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
