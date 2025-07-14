import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaTasks } from "react-icons/fa";

const sidebar = [
  {
    name: "Home",
    route: "/",
    icon: <FaHome className="size-6"/>,
    role: ["admin"],
  },
  {
    name: "Users",
    route: "/users",
    icon: <FaUsers className="size-6"/>,
    role: ["admin"],
  },
  {
    name: "Tasks",
    route: "/tasks",
    icon: <FaTasks className="size-6"/>,
    role: ["admin", "user"],
  },
];
const Sidebar = () => {
  return (
    <div className="hidden md:w-[150px] lg:w-[200px] bg-blue-600 md:flex flex-col items-center p-4">
      <h2 className="text-white text-lg font-bold font-abz">Taskyz</h2>
      <div className="mt-5 space-y-2">
        {sidebar.map((item) => (
          <NavLink
            key={item.name}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-3  hover:scale-102 p-2 rounded transition-all duration-300 ${
                isActive
                  ? "bg-white p-2 rounded-md text-blue-600"
                  : "text-white"
              }`
            }
          >
            {item.icon}
            <span className="hidden md:inline">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
