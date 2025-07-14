import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import ProtectedRoute from "./layout/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen">
            404 Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default App;
