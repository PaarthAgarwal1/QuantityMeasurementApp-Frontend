import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome"; // I'll create this

import Add from "./pages/Add";
import Subtract from "./pages/Subtract";
import Divide from "./pages/Divide";
import Convert from "./pages/Convert";
import Compare from "./pages/Compare";
import History from "./pages/History";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="add" element={<Add />} />
            <Route path="subtract" element={<Subtract />} />
            <Route path="divide" element={<Divide />} />
            <Route path="convert" element={<Convert />} />
            <Route path="compare" element={<Compare />} />
            <Route path="history" element={<History />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}