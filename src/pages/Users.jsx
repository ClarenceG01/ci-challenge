import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import { errorToast, successToast } from "../utils/toast";
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
const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  let id = 0;

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
		credentials: "include",
      });
	  if(!response.ok) {
		errorToast("Failed to delete user", "delete-user-e");
		return;
	  }
	  successToast("User deleted successfully", "delete-user-s");
	  refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
	  errorToast("Failed to delete user", "delete-user-e");
    }
  };
  return (
    <div className="w-full md:w-[calc(100%-150px)] lg:w-[calc(100%-250px)] flex flex-col items-center justify-start h-screen py-4 px-8">
      <Link to="/" className="w-full flex items-start gap-2">
        <IoArrowBackCircle className="size-6 text-blue-600" />
        <span>Back Home</span>
      </Link>
      <div className="w-full p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <button
          onClick={() => setShowModal((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700  mb-4 cursor-pointer hover:scale-102 transition-all duration-300"
        >
          Add User
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table table-zebra font-abz">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Username</th>
              <th className="text-center">Email</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : null}
          {users?.length > 0 ? (
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="text-center">{id + 1}</td>
                  <td className="text-center">{user.username}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setEditUserModal(true);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  No users found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {showModal &&
        createPortal(
          <AddUserModal
            setShowModal={setShowModal}
            updateUsersList={refetch}
          />,
          document.body
        )}
      {editUserModal &&
        createPortal(
          <EditUserModal
            setShowModal={setEditUserModal}
            user={editingUser}
            updateUsersList={refetch}
          />,
          document.body
        )}
    </div>
  );
};

export default Users;
