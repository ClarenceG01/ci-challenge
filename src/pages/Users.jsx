import { useState } from "react";
import { createPortal } from "react-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const users = [
    { id: 1, username: "john_doe", email: "john@example.com" },
    { id: 2, username: "jane_doe", email: "jane@example.com" },
    { id: 3, username: "alice_smith", email: "alice@example.com" },
    { id: 4, username: "bob_jones", email: "bob@example.com" },
  ];


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
		<table className="table table-zebra font-abz">
			<thead>
				<tr>
					<th className="text-center">ID</th>
					<th className="text-center">Username</th>
					<th className="text-center">Email</th>
					<th className="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.id}>
						<td className="text-center">{user.id}</td>
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
							<button className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-700 transition-all duration-200">
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
		{showModal &&
			createPortal(
				<AddUserModal setShowModal={setShowModal} />,
				document.body
			)}
		{editUserModal &&
			createPortal(
				<EditUserModal setShowModal={setEditUserModal} user={editingUser} />,
				document.body
			)}
	</div>
);
};

export default Users;
