import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const EditUserModal = ({ setShowModal, user }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/90">
      <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-[400px] relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose className="size-6" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center font-abz">
          Edit User Details
        </h2>
        <form>
          <div className="mb-4">
            <label className="block font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter username"
			  defaultValue={user.username}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter email"
			  defaultValue={user.email}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block font-medium mb-2">Reset Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter users new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-11 right-2  text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <IoEyeOffOutline className="size-5" />
              ) : (
                <IoEyeOutline className="size-5" />
              )}
            </button>
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

export default EditUserModal;
